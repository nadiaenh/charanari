"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"

const FormSchema = z.object({
    characterName: z.string({
        required_error: "Please enter a name for your character.",
    }),
    raceName: z
        .string({
            required_error: "Please select a race from the dropdown menu.",
        }),
})

export function CharacterForm({allRaces}) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data) {
        console.log("Submitted data:", data);
    }

    function raceDropdown() {
        return allRaces.map((race) => (
            <SelectItem key={race.id} value={race.name}>
                {race.name}
            </SelectItem>
        ))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

                {/* NAME INPUT FIELD */}
                <FormField
                    control={form.control}
                    name="characterName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Input {...field} placeholder="Enter a name for your character"/>
                            <FormDescription>
                                Description of this name field here.
                            </FormDescription>
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
                            <FormLabel>Race</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a race for your character"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {raceDropdown()}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can change your race later.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
