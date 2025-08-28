"use server"

export async function uploadImage(formData: FormData): Promise<string> {
    const url = `${process.env.API_URL}/products/upload-image`
    const req = await fetch(url, {
        method: 'POST',
        body: formData
    })

    const image = await req.json()

    return image.secure_url
}