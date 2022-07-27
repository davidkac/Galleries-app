import { put, call, takeLatest } from "redux-saga/effects";
import { getGalleries} from "./slice";
import galleryService from "../../services/GalleryService";

function* getGalleriesHandler() {
    try {
      const galleries = yield call(galleryService.getAll);
      yield put(
        setMovies({
          currentPage: galleries.current_page,
          data: galleries.data,
        })
      );
    } catch (e) {
      console.error(e);
    }
  }


export function* watchGetGalleries(){
    yield takeLatest(getGalleries.type, getGalleriesHandler);
}
