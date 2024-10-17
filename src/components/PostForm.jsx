import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Select, Button, RTE } from "./";
import dbService from "../appwrite/dbConf";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";

function PostForm({ post }) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, getValues, watch, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const user = useSelector((state) => state.authSlice.userData);

  const Submit = async (data) => {
    setIsLoading(true)
    if (post) {
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;
      if (file) {
        dbService.deleteFile(post.featuredImage);
      }
      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        featuredImage: file?.$id || undefined,
      });

      if (dbPost) {
        setIsLoading(false)
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await dbService.createPost({
          ...data,
          userId: user.$id,
        });
        if (dbPost) {
          setIsLoading(false)
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(Submit)} className="flex flex-wrap justify-center">
      <div className="w-full sm:w-2/3 px-2">
        <Input
          label="Title: "
          placeholder="Post Title"
          className="mb-4"
          {...register("title", { required: true })}
          
        />
        <Input
          label="Slug: "
          placeholder="Post Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full sm:w-2/3 md:w-1/3 px-2">
        <Input
          label="Featured Image: "
          type="file"
          className="mb-4"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={dbService.filePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status: "
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          disabled={isLoading}
          bgColor={isLoading? "bg-gray-500":(post? "bg-green-500":"bg-blue-500")}
          className="w-full"
        >
          {isLoading? (post? "Updating...":"Submitting..."):post?"Update":"Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
