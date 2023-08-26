"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
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
import type {RouterOutputs} from "~/utils/api";

// Define the type of the data returned by the getAllRaces endpoint
type getAllRacesOutputType = RouterOutputs["character"]["getAllRaces"]

type CharacterFormPropsType = { allRaces: getAllRacesOutputType, onSubmit: (data: any) => void };

const FormSchema = z.object({
    characterName: z
        .string({required_error: "Please enter a name for your character.",})
        .min(3, {message: "Name must be at least 3 characters long."})
        .max(20, {message: "Name must be at most 20 characters long."})
        .regex(/^[a-zA-Z]+$/, {message: "Name must only contain alphabet characters."}),

    raceName: z
        .string({
            required_error: "Please select a race from the dropdown menu.",
        }),
})

export function CharacterForm(props: CharacterFormPropsType) {

    const {allRaces, onSubmit} = props
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function raceDropdown() {
        return allRaces.map((race) => (
            <SelectItem key={race.id} value={race.raceName}>
                {race.raceName}
            </SelectItem>
        ))
    }

    // noinspection TypeScriptValidateTypes
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

                {/* NAME INPUT FIELD */}
                <FormField
                    control={form.control}
                    name="characterName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Character name</FormLabel>
                            <Input {...field} placeholder="Pick something cool like Michaelius or Aphrodite"/>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* RACE SELECTION FIELD */}
                <FormField
                    control={form.control}
                    name="raceName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Character race</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder=" "/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {raceDropdown()}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
