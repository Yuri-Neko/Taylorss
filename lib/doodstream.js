import axios from "axios";

export async function fetchDoods(url) {
    return new Promise(async (resolve, reject) => {
        const base_url = "https://api.hunternblz.com/doodstream";
        try {
            const { data } = await axios.post(
                base_url,
                {
                    pesan: "API+INI+BEBAS+DIPAKAI",
                    url,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            );
            resolve(data);
        } catch (error) {
            reject(error.response.data);
        }
    });
}
