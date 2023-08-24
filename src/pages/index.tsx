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

    if (getAllRacesIsLoading || getAllRaces === undefined) {
        return <>Welcome, page is loading...</>;
    }

    // Form submission handler
    const onSubmit = (data) => {
        console.log("Submitted data:", data);
        createCharacter({
            name: data.characterName,
            raceName: data.raceName,
        });
        console.log("Created character:", createdCharacterData);
    };

    if (createCharacterIsLoading) {
        return <>Character creation in progress...</>;
    }

    if (createCharacterIsSuccess) {
        return (
            <Layout>
                <p>
                    Character created!
                    <br/>
                    ID: {createdCharacterData.id}
                    <br/>
                    Name: {createdCharacterData.name}
                    <br/>
                    Race: {createdCharacterData.raceName}
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
