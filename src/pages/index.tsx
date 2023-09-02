"use client"

import {api} from "~/utils/api";
import React from "react";
import Layout from "../components/Layout";
import {CharacterForm, type FormSchema} from "~/components/CharacterForm";
import type * as z from "zod";
import {ProgressBar} from "~/components/ui/progress"

export default function Home() {

    // Create a new character
    const {
        mutate: createCharacter,
        data: createdCharacterId,
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
                <br/>
                <ProgressBar durationInSeconds={3}/>
            </Layout>
        )
    }

    if (createCharacterIsLoading) {
        return (
            <Layout>
                <>Character creation in progress...</>
                <ProgressBar durationInSeconds={20}/>
            </Layout>
        )
    }

    if (createCharacterIsSuccess && createdCharacterId !== undefined) {
        return (
            <Layout>
                <p>
                    Character created!
                    <br/>
                    Character ID: {createdCharacterId}
                </p>
            </Layout>
        )
    }

    return (
        <Layout>
            <CharacterForm allRaces={allRaces} allAges={allAges} allGenders={allGenders}/>
        </Layout>
    );
}
