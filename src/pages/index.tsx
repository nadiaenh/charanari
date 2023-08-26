"use client"

import {api} from "~/utils/api";
import React from "react";
import Layout from "../components/Layout";
import {CharacterForm} from "~/components/CharacterForm";

export default function Home() {

    // Create a new character
    const {
        mutate: createCharacter,
        data: createdCharacterData,
        isLoading: createCharacterIsLoading,
        isSuccess: createCharacterIsSuccess,
    } = api.character.createCharacter.useMutation();

    // Fetch necessary race data from database
    const {
        data: getAllRaces,
        isLoading: getAllRacesIsLoading
    } = api.character.getAllRaces.useQuery();

    // Generate character image using OpenAI
    const {
        mutate: generateCharacterImage,
        data: generatedImageURL,
        isSuccess: generateCharacterImageIsSuccess,
    } = api.character.generateImage.useMutation();

    if (getAllRacesIsLoading || getAllRaces === undefined) {
        return (
            <Layout>
                <>Welcome, page is loading...</>
            </Layout>
        )
    }

    // Form submission handler
    const onSubmit = (data: any) => {
        console.log("Submitted data:", data);
        createCharacter({
            characterName: data.characterName,
            raceName: data.raceName,
        });
        generateCharacterImage({
            prompt: "A fantasy character named " + data.characterName + " who is of the " + data.raceName + " race, drawn in the style of Genshin Impact."
        });
        console.log("Created character:", createdCharacterData);
        console.log("Generated image:", generatedImageURL);
    };

    if (createCharacterIsLoading) {
        return (
            <Layout>
                <>Character creation in progress...</>
            </Layout>
        )
    }

    if (createCharacterIsSuccess && generateCharacterImageIsSuccess) {
        return (
            <Layout>
                <p>
                    Character created!
                    <br/>
                    ID: {createdCharacterData.id}
                    <br/>
                    Name: {createdCharacterData.characterName}
                    <br/>
                    Race: {createdCharacterData.raceName}
                    <br/>
                    <img src={generatedImageURL} alt="Generated character image" width={150} height={150}/>
                </p>
            </Layout>
        )
    }

    return (
        <Layout>
            <CharacterForm allRaces={getAllRaces} onSubmit={onSubmit}/>
        </Layout>
    );
}
