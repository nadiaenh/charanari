"use client"

import { api } from "~/utils/api";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { ProgressBar } from "~/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { ChevronRight } from "lucide-react";
import HorizontalSelector from "~/components/ui/HorizontalSelect";

const FormSchema = z.object({
    characterName: z
        .string({
            required_error: "Please enter a name for your character.",
        })
        .min(3, { message: "Name must be at least 3 characters long." })
        .max(20, { message: "Name must be at most 20 characters long." })
        .regex(/^[a-zA-Z]+$/, {
            message: "Name must only contain alphabet characters.",
        }),

    genderName: z.string({
        required_error: "Please select the character's gender.",
    }),

    ageName: z.string({
        required_error: "Please enter the character's age.",
    }),

    raceName: z.string(),
});

export default function Home() {

    const formHook = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    // Create a new character
    const {
        mutateAsync: createCharacter,
        isLoading: createCharacterIsLoading,
        isSuccess: createCharacterIsSuccess,
    } = api.character.createCharacter.useMutation();

    // Fetch character prompts from database
    const {
        mutateAsync: getPrompts
    } = api.character.getPrompts.useMutation();

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

    // Remove useless hooks above as needed
    const util = api.useContext();
    const [characterID, setCharacterID] = React.useState("");

    // Use type inference here
    const [character, setCharacter] = React.useState({
        id: "",
        characterName: "",
        raceName: "",
        genderName: "",
        ageName: "",
        avatarPath: ""
    });

    // This will run every frame, if what's inside the dependency array is changed
    // If array is empty, will only run on first page load. If array is undefined, will run every frame always.
    useEffect(() => {
        if (characterID === "") {
            return;
        }
        util.character.getCharacterById.fetch({ characterId: characterID }).then
        ((retrievedCharacter) => {
            if (retrievedCharacter === null) {
                return;
            }
            setCharacter({
                ...character,
                id: retrievedCharacter.id,
                characterName: retrievedCharacter.characterName,
                raceName: retrievedCharacter.raceName,
                genderName: retrievedCharacter.genderName,
                ageName: retrievedCharacter.ageName,
                avatarPath: retrievedCharacter.avatarPath ?? "",
            });
            console.log("Character retrieved: ", retrievedCharacter);
        }).catch((error) => {
            console.error("Error retrieving character: ", error);
        });

    }, [characterID]);

    if (getAllRacesIsLoading || allRaces === undefined ||
        getAllAgesIsLoading || allAges === undefined ||
        getAllGendersIsLoading || allGenders === undefined) {
        return (
            <Layout>
                <>Welcome, page is loading...</>
                <br />
                <ProgressBar durationInSeconds={3} />
            </Layout>
        )
    }

    if (createCharacterIsLoading) {
        return (
            <Layout>
                <>Character creation in progress...</>
                <ProgressBar durationInSeconds={35} />
            </Layout>
        )
    }

    if (createCharacterIsSuccess && character !== undefined) {
        return (
            <Layout>
                <p>
                    Character created!
                    <br />
                    Character ID: {character.id}
                    <br />
                </p>
            </Layout>
        )
    }

    const raceOptions = allRaces.map((race) => ({
        id: race.id,
        name: race.name,
        image: race.imagePath.replace(/^~\//, "https://raw.githubusercontent.com/nadiaenh/charanari/main/")
    }));

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
        console.log("Form submitted with data: ", data);

        try {
            const prompts = await getPrompts({
                raceName: data.raceName,
                ageName: data.ageName,
                genderName: data.genderName,
            });
            if (prompts === undefined) {
                console.error("Error fetching prompts from database.");
                return;
            }
            console.log("Prompts for character: ", prompts);
            const createdCharacterID = await createCharacter({
                characterName: data.characterName,
                raceName: data.raceName,
                genderName: data.genderName,
                ageName: data.ageName,
                prompts: prompts,
            });
            setCharacterID(createdCharacterID);

        } catch (error) {
            console.error("Error handling form submission:", error);
        }
    };

    return (
        <Layout>
            <div className="bg-white dark:bg-gray-700 p-8 shadow-2xl rounded-3xl flex justify-center items-center">
                <Form {...formHook}>
                    <form onSubmit={formHook.handleSubmit(onSubmit)}>

                        {/* NAME INPUT FIELD */}
                        <FormField
                            control={formHook.control}
                            name="characterName"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <Input onChange={field.onChange} placeholder="Enter a name for your character" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* RACE CONTAINER */}
                        <HorizontalSelector items={raceOptions} onValueChange={(item) => {
                            formHook.setValue("raceName", item);
                        }} />

                        {/* GENDER AND AGE CONTAINER */}
                        <div className="flex justify-between">
                            <FormField
                                control={formHook.control}
                                name="genderName"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between">
                                            <Button
                                                type="button"
                                                className={`${
                                                    field.value === "Feminine" ? "bg-blue-500" : "bg-gray-300"
                                                } hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded`}
                                                onClick={() => formHook.setValue("genderName", "Feminine")}
                                            >
                                                F
                                            </Button>
                                            <Button
                                                type="button"
                                                className={`${
                                                    field.value === "Masculine" ? "bg-blue-500" : "bg-gray-300"
                                                } hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded`}
                                                onClick={() => formHook.setValue("genderName", "Masculine")}
                                            >
                                                M
                                            </Button>
                                            <Button
                                                type="button"
                                                className={`${
                                                    field.value === "Essenceless" ? "bg-blue-500" : "bg-gray-300"
                                                } hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded`}
                                                onClick={() => formHook.setValue("genderName", "Essenceless")}
                                            >
                                                E
                                            </Button>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formHook.control}
                                name="ageName"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between">
                                            <Button
                                                type="button"
                                                className={`${
                                                    field.value === "Ephemeral Youth" ? "bg-blue-500" : "bg-gray-300"
                                                } hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded`}
                                                onClick={() => formHook.setValue("ageName", "Ephemeral Youth")}
                                            >
                                                Young
                                            </Button>
                                            <Button
                                                type="button"
                                                className={`${
                                                    field.value === "Enigma of Ages" ? "bg-blue-500" : "bg-gray-300"
                                                } hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded`}
                                                onClick={() => formHook.setValue("ageName", "Enigma of Ages")}
                                            >
                                                Mature
                                            </Button>
                                            <Button
                                                type="button"
                                                className={`${
                                                    field.value === "Echos of Eternity" ? "bg-blue-500" : "bg-gray-300"
                                                } hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded`}
                                                onClick={() => formHook.setValue("ageName", "Echos of Eternity")}
                                            >
                                                Elder
                                            </Button>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="text-right">
                            <Button
                                type="submit"
                                className="shadow-lg bg-pink-300 hover:bg-pink-400 dark:bg-pink-700 dark:hover:bg-pink-800"
                            >
                                <ChevronRight className="text-white" />
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
        </Layout>
    );
}