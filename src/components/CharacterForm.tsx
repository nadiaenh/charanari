import React, {type FormEventHandler} from "react";
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
import {ChevronRight, Eraser} from "lucide-react";
import HorizontalSelector from "~/components/ui/HorizontalSelect";

// Type definitions
type getAllRacesOutputType = RouterOutputs["character"]["getAllRaces"];
type getAllGendersOutputType = RouterOutputs["character"]["getAllGenders"];
type getAllAgesOutputType = RouterOutputs["character"]["getAllAges"];
type CharacterFormPropsType = {
    allRaces: getAllRacesOutputType;
    allGenders: getAllGendersOutputType;
    allAges: getAllAgesOutputType;
    onSubmit: (data: z.infer<typeof FormSchema>) => void;
};

export const FormSchema = z.object({
    characterName: z
        .string({
            required_error: "Please enter a name for your character.",
        })
        .min(3, {message: "Name must be at least 3 characters long."})
        .max(20, {message: "Name must be at most 20 characters long."})
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
    const {allRaces, allGenders, allAges, onSubmit} = props;
    const form = useForm<z.infer<typeof FormSchema>>({
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* NAME INPUT FIELD */}
                <FormField
                    control={form.control}
                    name="characterName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Character name</FormLabel>
                            <Input
                                {...field}
                                placeholder="Write something here"
                            />
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* RACE SELECTION FIELD */}
                <FormField
                    control={form.control}
                    name="raceOptions"
                    render={({field}) => (
                        <FormItem>
                            <Select>
                                <FormControl>
                                    <HorizontalSelector items={raceOptions} onValueChange={field.onChange}/>
                                </FormControl>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* GENDER SELECTION FIELD */}
                <FormField
                    control={form.control}
                    name="genderName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Pick an essence</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Click on me"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>{genderDropdown()}</SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* AGE SELECTION FIELD */}
                <FormField
                    control={form.control}
                    name="ageName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Pick a life stage</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Click on me"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>{ageDropdown()}</SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* BUTTON CONTAINER */}
                <div>
                    {/* CLEAR FORM BUTTON */}
                    <Button type="reset" onReset={form.reset as FormEventHandler<HTMLButtonElement>}>
                        <Eraser/>
                    </Button>

                    {/* SUBMIT BUTTON */}
                    <Button type="submit">
                        <ChevronRight/>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
