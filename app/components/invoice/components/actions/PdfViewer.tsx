"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn components
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Components
import {
    BaseButton,
    InvoiceTemplate,
    SendPdfToEmailModal,
} from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/app/contexts/InvoiceContext";

// Icons
import { Download, Eye, Mail, Printer, Save } from "lucide-react";

import { useDebounce } from "use-debounce";

// ! Old passed props type
// type PdfViewerProps = {
//     pdfBlob: Blob;
// };

const PdfViewer = ({}) => {
    const {
        invoicePdf,
        pdfUrl,
        previewPdfInTab,
        downloadPdf,
        printPdf,
        saveInvoice,
        sendPdfToMail,
    } = useInvoiceContext();

    // ? Uncomment to enable live preview
    const { watch } = useFormContext();

    const [debouncedWatch] = useDebounce(watch, 2000);
    const formValues = debouncedWatch();

    // ? This was moved to context to fix window not defined error
    // const pdfUrl = useMemo(() => {
    //     return window.URL.createObjectURL(invoicePdf);
    // }, [invoicePdf]);
    return (
        <div className="my-5">
            {invoicePdf.size == 0 && (
                <>
                    <p className="text-xl font-semibold">Live preview:</p>
                    <InvoiceTemplate
                        sender={formValues?.sender}
                        receiver={formValues?.receiver}
                        details={formValues?.details}
                    />
                </>
            )}

            {invoicePdf.size != 0 && (
                <>
                    <p className="text-xl font-semibold">PDF View</p>
                    <div className="flex flex-wrap gap-x-2 py-1">
                        <BaseButton
                            tooltipLabel="Preview invoice in new tab"
                            onClick={previewPdfInTab}
                            size="icon"
                            variant={"outline"}
                        >
                            <Eye />
                        </BaseButton>
                        <BaseButton
                            tooltipLabel="Download invoice PDF"
                            onClick={downloadPdf}
                            size="icon"
                            variant={"outline"}
                        >
                            <Download />
                        </BaseButton>

                        <BaseButton
                            tooltipLabel="Print invoice"
                            onClick={printPdf}
                            size="icon"
                            variant={"outline"}
                        >
                            <Printer />
                        </BaseButton>

                        <BaseButton
                            tooltipLabel="Save invoice in website"
                            onClick={saveInvoice}
                            size="icon"
                            variant={"outline"}
                        >
                            <Save />
                        </BaseButton>

                        <SendPdfToEmailModal sendPdfToMail={sendPdfToMail}>
                            <BaseButton
                                tooltipLabel="Send invoice PDF to mail"
                                size="icon"
                                variant={"outline"}
                            >
                                <Mail />
                            </BaseButton>
                        </SendPdfToEmailModal>
                    </div>
                    <AspectRatio ratio={1 / 1.4}>
                        <iframe
                            className="h-full w-full"
                            src={`${pdfUrl}#toolbar=0`}
                        ></iframe>
                    </AspectRatio>
                </>
            )}
        </div>
    );
};

export default PdfViewer;
