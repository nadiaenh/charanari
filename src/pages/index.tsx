"use client"

import {api} from "~/utils/api";
import React from "react";
import Layout from "../components/Layout";
import {CharacterForm, type FormSchema} from "~/components/CharacterForm";
import type * as z from "zod";

export default function Home() {

    // Create a new character
    const {
        mutate: createCharacter,
        data: createdCharacterAvatar,
        isLoading: createCharacterIsLoading,
        isSuccess: createCharacterIsSuccess,
    } = api.character.createCharacter.useMutation();

    // Fetch race, age, and gender data from database
    const {
        data: allRaces,
        isLoading: getAllRacesIsLoading
    } = api.character.getAllRaces.useQuery();

    const {
        data: allAges,
        isLoading: getAllAgesIsLoading
    } = api.character.getAllAges.useQuery();

    const {
        data: allGenders,
        isLoading: getAllGendersIsLoading
    } = api.character.getAllGenders.useQuery();

    if (getAllRacesIsLoading || allRaces === undefined ||
        getAllAgesIsLoading || allAges === undefined ||
        getAllGendersIsLoading || allGenders === undefined) {
        return (
            <Layout>
                <>Welcome, page is loading...</>
            </Layout>
        )
    }

    // Form submission handler
    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log("Character creation initiated...")

        // Get the prompts for each attribute
        let prompts = "";
        const selectedGender = allGenders.find(gender => gender.name === data.genderName);
        const selectedAge = allAges.find(age => age.name === data.ageName);
        const selectedRace = allRaces.find(race => race.name === data.raceName);
        if (selectedGender && selectedAge && selectedRace) {
            prompts = selectedGender.prompt + "," + selectedAge.prompt + "," + selectedRace.prompt;
        }

        createCharacter({
            characterName: data.characterName,
            raceName: data.raceName,
            ageName: data.ageName,
            genderName: data.genderName,
            prompts: prompts
        });
        console.log("Created character:", createdCharacterAvatar);
    };

    if (createCharacterIsLoading) {
        return (
            <Layout>
                <>Character creation in progress...</>
            </Layout>
        )
    }

    if (createCharacterIsSuccess) {
        return (
            <Layout>
                <p>
                    Character created!
                    <br/>
                    <img
                        src={createdCharacterAvatar}
                        alt="output"
                    />
                </p>
            </Layout>
        )
    }

    return (
        <Layout>
            <CharacterForm allRaces={allRaces} allAges={allAges} allGenders={allGenders} onSubmit={onSubmit}/>
        </Layout>
    );
}
