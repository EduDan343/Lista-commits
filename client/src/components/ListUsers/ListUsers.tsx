import { useMemo, useEffect, useState } from "react";
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    type MaterialReactTableProps,
} from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import {
    Box,
    Button,
    // Dialog,
    // DialogActions,
    // DialogContent,
    // DialogTitle,
    IconButton,
    // MenuItem,
    // Stack,
    // TextField,
    Tooltip,
} from "@mui/material";

import CreateNewAccountModal from "../ModalForm/ModalForm";

import axios from "axios";

export const ListUsers = () => {
    type User = {
        _id: string;
        name: string;
        lastName: string;
        email: string;
        phone: number;
        date: string;
        notes: string;
    };

    const [userData, setUserData] = useState<User[]>([]);

    const [createModalOpen, setCreateModalOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/users");
            // const data = await response.json();
            setUserData(response.data);
        } catch (error) {
            console.log({ error });
        }
    };

    const updateUsers = async (user: User, id: string) => {
        try {
            const updateUser = await axios.put(
                `http://localhost:3001/users/${id}`,
                user
            );
            console.log({ updateUser });
        } catch (error) {
            console.log({ error });
        }
    };

    const handleDeleteUser = async (id: string) => {
        try {
            console.log("id user delete : ", id);
            const deletedUser = await axios.delete(
                `http://localhost:3001/users/${id}`
            );
            console.log({ deletedUser });
            await fetchUsers();
        } catch (error) {
            console.log({ error });
            alert("Error deleting user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: "name", //simple recommended way to define a column
                header: "Name",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "lastName", //simple recommended way to define a column
                header: "Lastname",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "email", //simple recommended way to define a column
                header: "Email",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "phone", //simple recommended way to define a column
                header: "Phone",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "date", //simple recommended way to define a column
                header: "Date",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "notes", //simple recommended way to define a column
                header: "Notes",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
        ],
        []
    );

    const handleCreateUser = async (user: User) => {
        try {
            console.log({ user });
            const response = await axios.post("http://localhost:3001/users", user);
            console.log({ response });
            fetchUsers();
        } catch (error) {
            console.log({ error });
        }
    };

    //   const handleUpdateUser = async (user: User) => {
    //     try {
    //       console.log({ user });
    //     } catch (error) {
    //       console.log({ error });
    //   }
    // }
    const handleSaveRowEdits: MaterialReactTableProps<User>["onEditingRowSave"] =
        async ({ exitEditingMode, row, values }) => {
            // if (!Object.keys(validationErrors).length) {
            //   tableData[row.index] = values;
            //   //send/receive api updates here, then refetch or update local table data for re-render
            //   setTableData([...tableData]);
            // }
            console.log({ row: row.original._id, values });
            const userId = row.original._id;

            try {
                await updateUsers(values, userId);
                await fetchUsers();
            } catch (error) {
                console.log({ error });
                alert("Error updating user");
            }
            exitEditingMode(); //required to exit editing mode and close modal
        };

    return (
        <div style={{ width: "100%" }}>
            <CreateNewAccountModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateUser}
            />
            <MaterialReactTable
                columns={columns}
                data={userData}
                editingMode="modal" //default
                enableColumnOrdering
                enableEditing
                onEditingRowSave={handleSaveRowEdits}
                renderTopToolbarCustomActions={() => (
                    <Button
                        onClick={() => setCreateModalOpen(true)}
                        variant="contained"
                        style={{ backgroundColor: "#0266a2" }}
                    >
                        Create New User
                    </Button>
                )}
                // onEditingRowSave={handleSaveRowEdits}
                // onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>

                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton
                                color="error"
                                onClick={() => handleDeleteUser(row.original._id)}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />
        </div>
    );
};