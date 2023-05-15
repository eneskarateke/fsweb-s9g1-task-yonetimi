import React from "react";
import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
  });

  const onSubmit = (data) => {
    const newTask = {
      title: data.title,
      description: data.description,
      people: data.people,
    };
    submitFn(newTask);
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          name="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                {...register("people", {
                  required: true,
                  max: {
                    value: 3,
                    message: "En fazla 3 kişi seçebilirsiniz",
                  },
                  min: {
                    value: 1,
                    message: "Lütfen en az bir kişi seçin",
                  },
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && <p>{errors.people.message}</p>}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
