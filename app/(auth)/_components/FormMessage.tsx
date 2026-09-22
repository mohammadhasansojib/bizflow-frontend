
type FormMessageProps = {
    success: boolean;
    message: string;
};

const FormMessage = ({ success, message }: FormMessageProps) => {
    return (
        <div
            className={`rounded-md border px-3 py-2 text-sm ${
                success
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-destructive/20 bg-destructive/10 text-destructive"
            }`}
        >
            {message}
        </div>
    );
};

export default FormMessage;
