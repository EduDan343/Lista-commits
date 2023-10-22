import { useState } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";

type User = {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    phone: number;
    date: string;
    notes: string;
};

interface CreateModalProps {
    columns: MRT_ColumnDef<User>[];
    onClose: () => void;
    onSubmit: (values: User) => void;
    open: boolean;
}

// const validateRequired = (value: string) => !!value.length;
// const validateEmail = (email: string) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// const validateAge = (age: number) => age >= 18 && age <= 50;

const CreateNewAccountModal = ({
    open,
    columns,
    onClose,
    onSubmit,
}: CreateModalProps) => {
    //   const [validationErrors, setValidationErrors] = useState<{
    //     [cellId: string]: string;
    //   }>({});

    const [values, setValues] = useState<User>(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ""] = "";
            return acc;
        }, {} as any)
    );

    //   const getCommonEditTextFieldProps = useCallback(
    //     (
    //       cell: MRT_Cell<User>
    //     ): MRT_ColumnDef<User>["muiTableBodyCellEditTextFieldProps"] => {
    //       return {
    //         error: !!validationErrors[cell.id],
    //         helperText: validationErrors[cell.id],
    //         onBlur: (event) => {
    //           const isValid =
    //             cell.column.id === "email"
    //               ? validateEmail(event.target.value)
    //               : cell.column.id === "age"
    //               ? validateAge(+event.target.value)
    //               : validateRequired(event.target.value);
    //           if (!isValid) {
    //             //set validation error for cell if invalid
    //             setValidationErrors({
    //               ...validationErrors,
    //               [cell.id]: `${cell.column.columnDef.header} is required`,
    //             });
    //           } else {
    //             //remove validation error for cell if valid
    //             delete validationErrors[cell.id];
    //             setValidationErrors({
    //               ...validationErrors,
    //             });
    //           }
    //         },
    //       };
    //     },
    //     [validationErrors]
    //   );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New User</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: "100%",
                            minWidth: { xs: "300px", sm: "360px", md: "400px" },
                            gap: "1.5rem",
                        }}
                    >
                        {columns.map((column) => {
                            if (column.accessorKey === "date") {
                                return (
                                    <TextField
                                        key={column.accessorKey}
                                        label={column.header}
                                        placeholder="DD/MM/YEAR"
                                        name={column.accessorKey}
                                        onChange={(e) =>
                                            setValues({ ...values, [e.target.name]: e.target.value })
                                        }
                                    />
                                );
                            }
                            return (
                                <TextField
                                    key={column.accessorKey}
                                    label={column.header}
                                    name={column.accessorKey}
                                    onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                    }
                                />
                            );
                        })}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New User
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNewAccountModal;