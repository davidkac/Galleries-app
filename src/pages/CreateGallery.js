import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGallery } from "../store/galleries/selectors";
import { createGallery, editGallery } from "../store/galleries/slice";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CreateGallery() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const retrievedGallery = useSelector(selectGallery);

  const [newGallery, setNewGallery] = useState({
    title: "",
    description: "",
    images: [{ url: "" }],
  });

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    console.log({ newGallery });
    if (id) {
      if (!retrievedGallery) {
        alert("You can edit only your own gallery");
        history.push("/galleries");
        return;
      }
      dispatch(
        editGallery({
          newGallery: {
            galleryId: id,
            title: newGallery.title,
            description: newGallery.description,
            images: newGallery.images,
          },
        })
      );
      setTimeout(() => {
        history.push(`/galleries/${retrievedGallery.id}`);
      }, 1500);
    } else {
      dispatch(createGallery(newGallery));
      setTimeout(() => {
        history.push("/galleries/profile");
      }, 1500);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (id) {
      history.push(`/galleries/${retrievedGallery.id}`);
    } else {
      history.push("/galleries/profile");
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...newGallery.images];
    list[index].url = value;
    setNewGallery({
      ...newGallery,
      images: list,
    });
  };

  const handleAddClick = () => {
    setNewGallery({
      ...newGallery,
      images: [...newGallery.images, { url: "" }],
    });
  };

  useEffect(() => {
    if (id) {
      setNewGallery(retrievedGallery);
      if (!retrievedGallery) {
        alert("You can edit only your own gallery");
        history.push("/galleries");
        return;
      }
    }
  }, [id, history, retrievedGallery]);

  const handleRemoveClick = (index) => {
    setNewGallery({
      ...newGallery,
      images: newGallery.images.filter((img, i) => index != i),
    });

  };

  const reorderArray = (event, originalArray) => {
    const movedItem = originalArray.find(
      (i, index) => index === event.oldIndex
    );
    const remainingItems = originalArray.filter(
      (i, index) => index !== event.oldIndex
    );

    const reorderedItems = [
      ...remainingItems.slice(0, event.newIndex),
      movedItem,
      ...remainingItems.slice(event.newIndex),
    ];

    return reorderedItems;

  };

  function changeOrder(index, direction) {
    var updatedImages = [...newGallery.images];
    setNewGallery({
      ...newGallery,
      images: reorderArray(
        { oldIndex: index, newIndex: index + (direction === "UP" ? -1 : 1) },
        updatedImages
      ),
    });
  }

  return (
    <div style={{backgroundColor:"#D0D0D0"}}>
      <Form onSubmit={handleSubmit}>
        <h2 style={{ padding: "10px" }}>
          {id ? "Edit Gallery" : "Create Gallery"}
        </h2>
        <div style={{ padding: "10px" }}>
          <Form.Control
            required
            type="text"
            id="title"
            placeholder="Title"
            value={newGallery?.title}
            onChange={({ target }) =>
              setNewGallery({ ...newGallery, title: target.value })
            }
          />
        </div>
        <div style={{ padding: "10px" }}>
          <Form.Control
            cols="50"
            rows="4"
            type="text"
            id="description"
            placeholder="Description"
            value={newGallery?.description}
            onChange={({ target }) =>
              setNewGallery({ ...newGallery, description: target.value })
            }
          />
        </div>
        {newGallery.images &&
          newGallery.images.map((x, i) => {
            return (
              <div>
                <input
                  required
                  key={i}
                  name="url"
                  value={x.url}
                  placeholder="Image url"
                  onChange={(e) => handleInputChange(e, i)}
                />
                <span>
                  {newGallery.images.length > 1 && (
                    <Button  variant="dark" onClick={() => handleRemoveClick(i)}>Remove</Button >
                  )}
                </span>
                <span>
                  {newGallery.images.length > 1 && (
                    <Button  variant="dark" type="button" onClick={() => changeOrder(i, "UP")}>
                      Move Up
                    </Button >
                  )}
                </span>
                <span>
                  {newGallery.images.length > 1 && (
                    <Button variant="dark"
                      type="button"
                      onClick={() => changeOrder(i, "DOWN")}
                    >
                      Move Down
                    </Button >
                  )}
                </span>
                <div>
                  {newGallery.images.length - 1 === i && (
                    <Button  variant="warning" onClick={handleAddClick}>Add picture</Button >
                  )}
                </div>
              </div>
            );
          })}

        <span>
          <Button variant="success" type="submit">{id ? "Edit" : "Submit"}</Button>

          <Button  variant="danger"  onClick={handleCancel}>Cancel</Button >
        </span>
      </Form>
    </div>
  );
}