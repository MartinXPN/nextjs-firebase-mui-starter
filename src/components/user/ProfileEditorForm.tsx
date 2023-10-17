import {memo, useCallback, useEffect} from "react";
import {string, infer as Infer, object} from "zod";
import {UserInfo} from "models/users";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateUserInfo} from "@/services/users";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


// Schema for user profile:
const schema = object({
    displayName: string().min(3).max(30),
});
type Schema = Infer<typeof schema>;

function ProfileEditorForm({user, stopEditing}: {
    user: UserInfo, stopEditing: () => void,
}) {
    const getDefaultFieldValues = useCallback(() => ({
        displayName: user?.displayName,
    }), [user]);
    const formMethods = useForm<Schema>({
        mode: 'onBlur',
        resolver: zodResolver(schema),
        defaultValues: getDefaultFieldValues(),
    });
    const {handleSubmit, control, formState: {errors}, reset} = formMethods;
    useEffect(() => reset(getDefaultFieldValues()), [getDefaultFieldValues, reset]);
    errors && Object.keys(errors).length && console.log('level errors:', errors);

    // Submit and Cancel
    const onSubmit = async (data: Schema) => {
        await updateUserInfo(user.id, data.displayName);
        console.log('submitting', data);
        stopEditing();
    };
    const onCancel = () => {
        console.log('cancelling...');
        stopEditing();
    }

    return <>
        <FormProvider {...formMethods}>
        <form key="profile-form">
            <Controller name="displayName" control={control} render={({ field: { ref, ...field } }) => (
                <TextField
                    required variant="outlined" placeholder="2" fullWidth
                    label="First & Last name"
                    error={Boolean(errors.displayName)} helperText={errors.displayName?.message}
                    inputRef={ref} {...field} sx={{maxWidth: '100%'}}/>
            )}/>

            <Stack direction="row" spacing={1} paddingY={1}>
                <Button variant="outlined" onClick={handleSubmit(onSubmit)}>Save</Button>
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            </Stack>
        </form>
        </FormProvider>
    </>
}

export default memo(ProfileEditorForm);
