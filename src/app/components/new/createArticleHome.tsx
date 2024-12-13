"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleX, Eye, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ControllerRenderProps, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

import Heading from "@/app/components/new/heading";
import PreviewArticle from "@/app/components/new/preview-article";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  PreviewDialog,
} from "@/app/components/new/preview-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/category";

const schema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }).max(40, { message: "タイトルは最大40文字です" }),
  categoryId: z.string().min(1, { message: "カテゴリを選択してください" }),
  nodes: z
    .array(
      z.object({
        comment: z
          .string()
          .min(0, { message: "タイトルを入力してください" })
          .max(80, { message: "タイトルは最大80文字です" }),
        nodeTitle: z
          .string()
          .min(1, { message: "タイトルを入力してください" })
          .max(40, { message: "タイトルは最大40文字です" }),
        nodeUrl: z.string().url({ message: "有効なURLを入力してください" }),
      }),
    )
    .min(1, { message: "少なくとも1つのアイテムを追加してください" }),
  tags: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .length(3, { message: "タグは3つまで指定してください。" }),
});

type FormData = z.infer<typeof schema>;
type ItemType = z.infer<typeof schema>["nodes"][number];

type Props = {
  categories: Category[];
  options: Option[];
};

export default function CreateArticleHome({ categories, options }: Props) {
  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      categoryId: "",
      nodes: [
        { comment: "", nodeTitle: "", nodeUrl: "" },
        { comment: "", nodeTitle: "", nodeUrl: "" },
      ],
      tags: [],
    },
    resolver: zodResolver(schema),
  });

  const { append, fields, remove } = useFieldArray({
    name: "nodes",
    control: form.control,
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null);

  useEffect(() => {
    if (isSubmitting && !loadingToastId) {
      const toastId = toast.loading("公開中...");
      setLoadingToastId(toastId);
    }

    if (!isSubmitting && loadingToastId) {
      toast.dismiss(loadingToastId);
      setLoadingToastId(null);
    }
  }, [isSubmitting, loadingToastId]);

  const onSubmit = async (data: FormData) => {
    if (isSubmitting || isPublished) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/article/new`, {
        body: JSON.stringify({
          title: data.title,
          categoryId: data.categoryId,
          nodes: data.nodes,
          tagIds: data.tags.map((tag) => tag.value),
        }),
        method: "POST",
      });

      if (!response.ok) throw new Error("公開に失敗しました");

      toast.success("公開完了しました！");
      setIsPublished(true);
      form.reset();
      router.push("/");
      router.refresh();
    } catch {
      toast.error("公開に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-green-200">
      <div className="flex justify-center px-[10px] py-[100px]">
        <div className="w-full rounded-md bg-white p-8 md:w-[85%] xl:w-3/4 xl:px-[70px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/*記事のタイトル*/}
              <div>
                <Heading
                  title="記事タイトルを作成"
                  description="このロードマップのタイトルを20文字以内で教えてください"
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }: { field: ControllerRenderProps<FormData, "title"> }) => (
                    <FormItem>
                      <FormLabel>タイトル</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="タイトルを入力" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* カテゴリ */}
              <div>
                <Heading title="カテゴリを選択" description="この記事のカテゴリを選択してください" />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }: { field: ControllerRenderProps<FormData, "categoryId"> }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="カテゴリを選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <Heading title="タグを選択" description="この記事のタグを選択してください" />
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          defaultOptions={options}
                          placeholder="タグを選択"
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*記事ノード*/}
              <div>
                <Heading title="記事ノードを作成" description="ノードは最大5つまで追加することができます" />
                {fields.map((field: ItemType, index: number) => (
                  <div key={index} className="mb-[20px] space-y-4 rounded-md border bg-[#fffefc] p-5">
                    <div className="flex justify-between">
                      <h3 className="text-[25px] font-bold">{index + 1}つ目</h3>
                      {index > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="flex items-center gap-2 text-red-500"
                        >
                          <CircleX size={14} />
                          削除
                        </Button>
                      )}
                    </div>
                    <div className="grid w-full gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`nodes.${index}.nodeTitle`}
                        render={({
                          field,
                        }: {
                          field: ControllerRenderProps<FormData, `nodes.${number}.nodeTitle`>;
                        }) => (
                          <FormItem>
                            <FormLabel>タイトル</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="タイトルを入力" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`nodes.${index}.nodeUrl`}
                        render={({ field }: { field: ControllerRenderProps<FormData, `nodes.${number}.nodeUrl`> }) => (
                          <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="https://example.com" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`nodes.${index}.comment`}
                      render={({ field }: { field: ControllerRenderProps<FormData, `nodes.${number}.comment`> }) => (
                        <FormItem>
                          <FormLabel>コメント</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="コメントを入力（任意）" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                {fields.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ comment: "", nodeTitle: "", nodeUrl: "" })}
                    className="flex w-full items-center gap-2 bg-green-300 py-6 hover:bg-green-400"
                  >
                    <Plus />
                    ノードの追加
                  </Button>
                )}
              </div>

              {/*公開*/}
              <div>
                <Heading title="記事の公開" />

                <PreviewDialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      onClick={() => console.log(form.getValues())}
                      variant="outline"
                      className="mb-3 flex w-full items-center gap-3 py-6"
                    >
                      <Eye />
                      プレビュー
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="flex h-[90vh] flex-col items-center overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <Eye size={30} />
                        <p className="text-[30px]">プレビュー</p>
                      </DialogTitle>
                    </DialogHeader>
                    <PreviewArticle formData={form.getValues()} />
                  </DialogContent>
                </PreviewDialog>

                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSubmitting || isPublished}
                  className={`flex w-full items-center gap-3 py-6 ${isSubmitting || isPublished ? "bg-gray-400" : ""} bg-green-300 hover:bg-green-400`}
                >
                  <Check />
                  {isPublished ? "公開中" : "公開"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
