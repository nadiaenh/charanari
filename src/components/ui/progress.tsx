"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import {cn} from "~/components/utils"

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({className, value, ...props}, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
            className
        )}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className="h-full w-full flex-1 bg-primary transition-all"
            style={{transform: `translateX(-${100 - (value ?? 0)}%)`}}
        />
    </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export {Progress}

export function ProgressBar({durationInSeconds}: { durationInSeconds: number }) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const startTime = Date.now();
        const endTime = startTime + durationInSeconds * 1000;

        const updateProgress = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const progressValue = (elapsedTime / (durationInSeconds * 1000)) * 100;

            setProgress(progressValue);

            if (currentTime < endTime) {
                requestAnimationFrame(updateProgress);
            }
        };

        requestAnimationFrame(updateProgress);

        return () => {
            setProgress(0);
        };
    }, [durationInSeconds]);

    return <Progress value={progress}/>;
}