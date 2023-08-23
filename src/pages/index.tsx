import {api} from "~/utils/api";
import React, {useState} from "react";
import Layout from "../components/Layout";
import type {RouterInputs} from "~/utils/api";
import {CharacterForm} from "~/components/CharacterForm";

// Define the character type based on the tRPC API definition
type CharacterType = RouterInputs["character"]["create"];

export default function Home() {

    const {data: allRaces, isLoading: allRacesIsLoading} = api.race.getAll.useQuery();

    if (allRacesIsLoading || allRaces === undefined) {
        return <>Page is Loading</>;
    }

    return (
        <Layout>
            <CharacterForm allRaces={allRaces}/>

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
