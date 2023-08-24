"use client"

import {api} from "~/utils/api";
import React from "react";
import Layout from "../components/Layout";
import {CharacterForm} from "~/components/CharacterForm";

export default function Home() {

    // Create a new character
    const {mutate: createCharacter} = api.character.createCharacter.useMutation();

    // Fetch necessary race data from database
    const {
        data: getAllRaces,
        isLoading: getAllRacesIsLoading
    } = api.character.getAllRaces.useQuery();

    if (getAllRacesIsLoading || getAllRaces === undefined) {
        return <>Page is Loading</>;
    }

    // Form submission handler
    const onSubmit = (data) => {
        console.log("Submitted data:", data);

        createCharacter({
            name: data.characterName,
            raceName: data.raceName,
        });

        console.log("Character created!")
    };

    return (
        <Layout>
            <CharacterForm allRaces={getAllRaces} onSubmit={onSubmit}/>

            {/* OLD CODE TO DISPLAY ALL EXISTING CHARACTERS IN THE DATABASE */}
            {/*<p className="text-black">*/}
            {/*    /!* Display loading state or character data *!/*/}
            {/*    {isLoadingAllCharacters ? (*/}
            {/*        "Loading..."*/}
            {/*    ) : (*/}
            {/*        <pre className="text-black">*/}
            {/*            {JSON.stringify(allCharacters, null, 2)}*/}
            {/*        </pre>*/}
            {/*    )}*/}
            {/*</p>*/}
        </Layout>
    );
}
