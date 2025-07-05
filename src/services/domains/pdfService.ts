import { PdfType, PdfDocument } from '../../interfaces/pdf';
import { api, extractAxiosError } from '../api';
import API_ROUTES from '../api/routes';
import { ApiResponse } from '../../types/api';
import { ProjectService } from './projectService';

interface GeneratePdfData {
    projectId: string;
    pdfType: PdfType;
}

interface SignPdfData {
    file: File;
}

export const PdfService = {
    async generate(data: GeneratePdfData): Promise<ApiResponse<PdfDocument>> {
        try {
            const response = await api.post(API_ROUTES.PDFS.GENERATE, data);
            return response.data;
        } catch (error) {
            throw new Error(extractAxiosError(error));
        }
    },

    async sign(
        id: string,
        signPdf: SignPdfData,
    ): Promise<ApiResponse<PdfDocument>> {
        try {
            const formData = new FormData();
            formData.append('file', signPdf.file);

            const response = await api.post(
                API_ROUTES.PDFS.SIGN({ id }),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            return response.data;
        } catch (error) {
            throw new Error(extractAxiosError(error));
        }
    },

    async getByProject(projectId: string): Promise<ApiResponse<PdfDocument[]>> {
        try {
            const response = await api.get(
                API_ROUTES.PDFS.BY_PROJECT({ projectId }),
            );
            return response.data;
        } catch (error) {
            throw new Error(extractAxiosError(error));
        }
    },

    async getById(id: string): Promise<ApiResponse<PdfDocument>> {
        try {
            const response = await api.get(API_ROUTES.PDFS.BY_ID({ id }));
            return response.data;
        } catch (error) {
            throw new Error(extractAxiosError(error));
        }
    },

    async getSignedUrl(pdfId: string): Promise<string> {
        try {
            const response = await api.get(
                API_ROUTES.PDFS.SIGNED_URL({ id: pdfId }),
            );
            return response.data.data.url;
        } catch (error) {
            throw new Error(extractAxiosError(error));
        }
    },

    async downloadPdf(pdfId: string): Promise<void> {
        try {
            const response = await api.get(
                API_ROUTES.PDFS.DOWNLOAD({ id: pdfId }),
                {
                    responseType: 'blob',
                },
            );

            const pdf = await this.getById(pdfId);
            const project = await ProjectService.getById(pdf.data.projectId);

            const contentDisposition = response.headers['content-disposition'];
            const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
            const filename = filenameMatch
                ? filenameMatch[1]
                : `${project.data.agency.agencyNumber}-${pdf.data.pdfType}-${project.data.upeCode}.pdf`;

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            throw new Error(extractAxiosError(error));
        }
    },

    async deletePdf(id: string): Promise<void> {
        try {
            await api.delete(API_ROUTES.PDFS.DELETE({ id }));
        } catch (error) {
            throw new Error(extractAxiosError(error));
        }
    },
};
