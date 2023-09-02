import React, { type FormEventHandler } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export const FormSchema = z.object({
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

export function CharacterForm(props: CharacterFormPropsType) {
    const { allRaces, allGenders, allAges } = props;

    const formHook = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const raceOptions = allRaces.map((race) => (
        {
            id: race.id,
            name: race.name,
            image: race.imagePath.replace(/^~\//, "https://raw.githubusercontent.com/nadiaenh/charanari/main/")
        }
    ));

    function genderDropdown() {
        return allGenders.map((gender) => (
            <SelectItem key={gender.id} value={gender.name}>
                {gender.name}
            </SelectItem>
        ));
    }

    function ageDropdown() {
        return allAges.map((age) => (
            <SelectItem key={age.id} value={age.name}>
                {age.name}
            </SelectItem>
        ));
    }

    const onSubmit = (data: any) => {
        console.log("onSubmit was triggered!");
        console.log(data);
    };

    return (
        <div className="bg-white p-8 shadow-2xl rounded-3xl flex justify-center items-center">
            <Form {...formHook}>
                <form onSubmit={formHook.handleSubmit(onSubmit)}>

                    {/* NAME INPUT FIELD */}
                    <FormField
                        control={formHook.control}
                        name="characterName"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>Character name</FormLabel>
                                <Input onChange={field.onChange}/>
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
                                                <SelectValue placeholder="Click on me" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>{genderDropdown()}</SelectContent>
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
                                                <SelectValue placeholder="Click on me" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>{ageDropdown()}</SelectContent>
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
                            className="shadow-lg bg-pink-300 hover:bg-pink-400"
                        >
                            <ChevronRight className="text-white" />
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    );
}
