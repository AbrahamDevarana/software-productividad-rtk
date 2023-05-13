import { statusTypes } from "@/types";

type StatusTypes = keyof typeof statusTypes;

export const getStatus = (status: StatusTypes) => {
    return statusTypes[status as keyof typeof statusTypes];
}