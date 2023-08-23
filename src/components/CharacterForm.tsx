import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useForm, Controller} from "react-hook-form";
import {Button} from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
} from "~/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import {Input} from "~/components/ui/input";

const characterFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name should be at least 2 characters long.")
        .max(50)
        .nonempty(),
    raceName: z.string().nonempty("Please select a race from the dropdown menu."),
});

export function CharacterForm({allRaces}) {
    const formMethods = useForm({
        resolver: zodResolver(characterFormSchema),
        defaultValues: {
            name: "",
            raceName: "",
        },
    });

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Form {...formMethods}>
                <form
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        name="name"
                        label="Character Name"
                        control={formMethods.control}
                        render={({field}) => <Input {...field} />}
                    />
                    <FormField
                        name="raceName"
                        label="Character Race"
                        control={formMethods.control}
                        render={({field}) => (
                            <Controller
                                name="raceName"
                                control={formMethods.control}
                                render={({field: raceField}) => (
                                    <RaceSelect
                                        races={allRaces}
                                        field={raceField}
                                    />
                                )}
                            />
                        )}
                    />
                    <Button type="submit">Create Character</Button>
                </form>
            </Form>
        </div>
    );
}

export function FormField({name, label, control, render}) {
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Controller
                    name={name}
                    control={control}
                    render={render}
                />
            </FormControl>
        </FormItem>
    );
}

export function RaceSelect({races, field}) {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a race"/>
            </SelectTrigger>
            <SelectContent>
                {races.map((race) => (
                    <SelectItem
                        key={race.name}
                        value={race.name}
                        onSelect={() => field.onChange(race.name)}
                    >
                        {race.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
