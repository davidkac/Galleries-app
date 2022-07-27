import HttpService from "./HttpService";

class GalleryService extends HttpService{
    getAll = async () => {

        const {data} = await this.client.get("galleries");
        return data;
    }

    get = async (id) => {
        const {data} = await this.client.get(`/galleries/${id}`);
        return data;
    }

    create = async (galleryData) => {
        const { data } = await this.client.post("/galleries", galleryData);
        return data;
    }

    delete = async (gallery) => {
        const { data } = await this.client.delete(`/galleries/${gallery}`);
        return data;
    }

    edit = async (galleryId, gallery) => {
        const { data } = await this.client.put(`/galleries/${galleryId}`, gallery);
        return data;
    }


}

const galleryService = new GalleryService();
export default galleryService;