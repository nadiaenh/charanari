import { api } from "~/utils/api";
import React, { useState } from "react";
import Layout from "../components/Layout";
import type { RouterInputs } from "../utils/api";

// Define the character type based on the tRPC API definition
type CharacterType = RouterInputs["character"]["create"];

export default function Home() {

    // State to hold the character data for creating a new character
    const [newCharacter, setNewCharacter] = useState<CharacterType>({
        name: "",
        raceName: ""
    });

    // Access tRPC utilities from the context
    const tRpcUtils = api.useContext();

    // Mutation for creating a new character
    const { mutate: createCharacter } = api.character.create.useMutation({
        onSuccess: () => {
            // Invalidate the cache after creating a new character
            void tRpcUtils.character.getAll.invalidate();
        }
    });

    // Fetch all characters from the server
    const {
        data: allCharacters,
        isLoading: isLoadingAllCharacters,
    } = api.character.getAll.useQuery();

    // Fetch all races from the server
    const {
        data: allRaces,
        isLoading: isLoadingAllRaces
    } = api.race.getAll.useQuery();

    // Display loading state while fetching race data
    if (isLoadingAllRaces || allRaces === undefined) {
        return <>Page is Loading</>;
    }

    // Handle input field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCharacter((prevCharacter) => ({
            ...prevCharacter,
            [name]: value,
        }));
    };

    // Handle select field changes
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCharacter((prevCharacter) => ({
            ...prevCharacter,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted:", newCharacter);
        createCharacter(newCharacter);
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newCharacter.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Race:</label>
                    <select
                        name="raceName"
                        value={newCharacter.raceName}
                        onChange={handleSelectChange}
                        disabled={isLoadingAllRaces}
                    >
                        <option value="" disabled></option>
                        {allRaces.map((race) => (
                            <option key={race.name} value={race.name}>
                                {race.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Disable the button if input fields are empty */}
                <button
                    type="submit"
                    disabled={newCharacter.name === "" || newCharacter.raceName === ""}
                >
                    Create Character
                </button>
            </form>

            <p className="text-black">
                {/* Display loading state or character data */}
                {isLoadingAllCharacters ? (
                    "Loading..."
                ) : (
                    <pre className="text-black">
                        {JSON.stringify(allCharacters, null, 2)}
                    </pre>
                )}
            </p>
        </Layout>
    );
}
