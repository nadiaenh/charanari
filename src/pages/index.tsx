"use client"

import {api} from "~/utils/api";
import React, { type FormEventHandler } from "react";
import Layout from "../components/Layout";
import {ProgressBar} from "~/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
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
import type { RouterOutputs } from "~/utils/api";
import { ChevronRight, Eraser } from "lucide-react";
import HorizontalSelector from "~/components/ui/HorizontalSelect";

// Type definitions
type getAllRacesOutputType = RouterOutputs["character"]["getAllRaces"];
type getAllGendersOutputType = RouterOutputs["character"]["getAllGenders"];
type getAllAgesOutputType = RouterOutputs["character"]["getAllAges"];
type CharacterFormPropsType = {
    allRaces: getAllRacesOutputType;
    allGenders: getAllGendersOutputType;
    allAges: getAllAgesOutputType;
};

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
        mutate: createCharacter,
        data: createdCharacterId,
        isLoading: createCharacterIsLoading,
        isSuccess: createCharacterIsSuccess,
    } = api.character.createCharacter.useMutation();

    // Fetch character prompts from database
    const {
        mutate: getPrompts,
        data: prompts
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

    const raceOptions = allRaces.map((race) => ({
        id: race.id,
        name: race.name,
        image: race.imagePath.replace(/^~\//, "https://raw.githubusercontent.com/nadiaenh/charanari/main/")
    }));

    const genderOptions = allGenders.map((gender) => (
        <SelectItem key={gender.id} value={gender.name}>
            {gender.name}
        </SelectItem>
    ));

    const ageOptions = allAges.map((age) => (
        <SelectItem key={age.id} value={age.name}>
            {age.name}
        </SelectItem>
    ));

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data) => {

        console.log("Form submitted with data: ", data);
        getPrompts({
            raceName: data.raceName,
            ageName: data.ageName,
            genderName: data.genderName,
        });

        if (prompts) {
            console.log("Prompts for character: ", prompts);
            createCharacter({
                characterName: data.characterName,
                raceName: data.raceName,
                genderName: data.genderName,
                ageName: data.ageName,
                prompts: prompts
            });
        } else {
            throw new Error("Error: could not fetch character prompts.");
        }

        if (createdCharacterId) {
            console.log("Created character ID: ", createdCharacterId);
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
                                    <Input onChange={field.onChange} placeholder="Enter a name for your character"/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* RACE CONTAINER */}
                        <HorizontalSelector items={raceOptions} onValueChange={(item) => {
                            formHook.setValue("raceName", item);
                        }}/>

                        {/* GENDER AND AGE CONTAINER */}
                        <div className="flex justify-between">
                            <FormField
                                control={formHook.control}
                                name="genderName"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pick an essence" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {genderOptions}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formHook.control}
                                name="ageName"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pick a life stage" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {ageOptions}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
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