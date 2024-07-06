'use client'

import { useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import { BsBlockquoteLeft, BsImage, BsType, BsTypeBold, BsTypeH1, BsTypeH2, BsTypeH3, BsTypeH4, BsTypeItalic } from "react-icons/bs";
import { MdFormatListBulleted, MdOutlineFormatUnderlined, MdOutlineRedo, MdOutlineUndo } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import Link from "@tiptap/extension-link";
import { RxTransparencyGrid } from "react-icons/rx";
import TextAlign from "@tiptap/extension-text-align";
import { MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight } from "react-icons/md";
import Underline from "@tiptap/extension-underline";
import { IoIosLink } from "react-icons/io";
import { Input } from "antd";


interface Props {
    setFieldValue: (field: string, value: any) => void;
    getFieldValue: (field: string) => any;
    resetFields: () => void;
    submit: () => void;
}

export const Editor = ({setFieldValue, getFieldValue, resetFields, submit}: Props ) => {

    const editor = useEditor({ 
        extensions: [
            Underline.configure({
                HTMLAttributes: {
                    class: 'underline',
                },
            }),
            Link.configure({
                protocols: ['https', 'mailto', 'tel'],
                HTMLAttributes: {
                    class: 'text-blue-500 underline cursor-pointer',
                    rel: 'noopener noreferrer',
                },
                validate: href => /^https?:\/\//.test(href),
            }),
            Color.configure({
                types: ['textStyle'],
            }),
            Image.configure({
                allowBase64: true,
                HTMLAttributes: {
                    class: 'w-full h-auto',
                },
            }),
            TextStyle,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
            }),
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4, 5],
                },
                paragraph: {

                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc pl-8',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal pl-8',
                    },
                },
                listItem: {
                    HTMLAttributes: {
                        class: 'mb-2',
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: 'border-l-4 border-gray-300 pl-2',
                    },
                },
                history: {
                    depth: 100,
                    newGroupDelay: 300,
                }

            }),
        ],
        content: getFieldValue('content'),
        editorProps: {
            attributes: {
                class: 'p-5 min-h-[200px] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rich-text',
            },
        },
        onUpdate: ({ editor, transaction }) => {
           setFieldValue('content', editor.getHTML());
           submit();
        },
        onCreate: ({ editor }) => {
            if (editor) {
                resetFields();
            }
        }
    });

    const addImage = useCallback(() => {
        const url = window.prompt('URL');
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);


    // useEffect(() => {
    //     if (editor) {
    //         editor.commands.setContent(getFieldValue('content'));
    //     }
    // }, [editor, getFieldValue('content')]);
    

    

  return (
    <>
    
    <Input type="hidden" id="content" name="content" />
    {
            editor && (
                <div className="">
                    <div className="border">
                        <div className="flex flex-wrap gap-5 px-2 border items-center py-1  bg-white sticky top-0 z-50">
                                <button 
                                    title="Heading 1"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
                                ><BsTypeH1 /></button>
                                <button 
                                    title="Heading 2"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
                                ><BsTypeH2 /></button>
                                <button 
                                    title="Heading 3"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} 
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('heading', { level: 4 }) ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleHeading({ level: 4 }).run()}
                                ><BsTypeH3 /></button>
                                <button 
                                    title="Heading 4"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} 
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('heading', { level: 5 }) ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleHeading({ level: 5 }).run()}
                                ><BsTypeH4 /></button>
                                <button 
                                    title="Paragraph"
                                    type="button"
                                    onClick={() => editor.chain().focus().setParagraph().run()}
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('paragraph') ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().setParagraph().run()}
                                ><BsType /></button>

                                <div className="border-l-2 border-gray-300 border h-10 border-r-0"></div>

                                {/* Bold */}
                                <button 
                                    title="Bold"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleBold().run()} 
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleBold().run()}
                                ><BsTypeBold /></button>
                                {/* Italic */}
                                <button 
                                    title="Italic"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleItalic().run()} 
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                                ><BsTypeItalic /></button>

                                {/* Underline */}
                                <button 
                                    title="Underline"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleUnderline().run()} 
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('underline') ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleUnderline().run()}
                                ><MdOutlineFormatUnderlined /></button>
                                <div className="border-l-2 border-gray-300 border h-10 border-r-0"></div>

                                {/* Bullet List */}
                                <button 
                                    title="Bullet List"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleBulletList().run()}
                                ><MdFormatListBulleted /></button>

                                <button 
                                    title="Ordered List"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                                ><GoListOrdered /></button>


                                <div className="border-l-2 border-gray-300 border h-10 border-r-0"></div>

                                {/* Blockquote */}
                                <button 
                                    title="Blockquote"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleBlockquote().run()}
                                ><BsBlockquoteLeft /></button>

                                <div className="border-l-2 border-gray-300 border h-10 border-r-0"></div>

                                {/* Align Left */}

                                <button
                                    title="Align Left"
                                    type="button"
                                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('textAlign', { align: 'left' }) ? 'bg-gray-200' : ''}`}
                                ><MdFormatAlignLeft /></button>

                                {/* Align Center */}
                                <button
                                    title="Align Center"
                                    type="button"
                                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('textAlign', { align: 'center' }) ? 'bg-gray-200' : ''}`}
                                ><MdFormatAlignCenter /></button>

                                {/* Align Right */}

                                <button
                                    title="Align Right"
                                    type="button"
                                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('textAlign', { align: 'right' }) ? 'bg-gray-200' : ''}`}
                                ><MdFormatAlignRight /></button>

                                {/* Align Justify */}

                                <button
                                    title="Align Justify"
                                    type="button"
                                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('textAlign', { align: 'justify' }) ? 'bg-gray-200' : ''}`}
                                    ><MdFormatAlignJustify /></button>

                                <div className="border-l-2 border-gray-300 border h-10 border-r-0"></div>  

                                {/* Undo */}
                                <button 
                                    title="Undo"
                                    type="button"
                                    onClick={() => editor.chain().focus().undo().run()}
                                    className={`text-gray-500 px-2 py-1 rounded-md`}
                                    disabled={!editor.can().chain().focus().undo().run()}
                                ><MdOutlineUndo /></button>

                                {/* Redo */}

                                <button 
                                    title="Redo"
                                    type="button"
                                    onClick={() => editor.chain().focus().redo().run()}
                                    className={`text-gray-500 px-2 py-1 rounded-md`}
                                    disabled={!editor.can().chain().focus().redo().run()}
                                ><MdOutlineRedo /></button>

                                <div className="border-l-2 border-gray-300 border h-10 border-r-0"></div>

                                {/* Add Image */}

                                {/* <button 
                                    title="Add Image"
                                    type="button"
                                    onClick={addImage}
                                    className={`text-gray-500 px-2 py-1 rounded-md`}
                                ><BsImage /></button> */}

                                {/* Color */}
                                
                                {/* <input 
                                    type="color" 
                                    className="w-6"
                                    onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                                /> */}

                                {/* Link */}
                                
                                <button 
                                    title="Link"
                                    type="button"
                                    onClick={() => {
                                        const url = window.prompt('URL');
                                        const valid = url && /^https?:\/\//.test(url);
                                        if (url && valid) {
                                            editor.chain().focus().toggleLink({ href: url, target: '_blank' }).run();
                                        }
                                    }}
                                    className={`text-gray-500 px-2 py-1 rounded-md`}
                                ><IoIosLink /></button>
                               
                               <div className="border-l-2 border-gray-300 border h-10 border-r-0"></div>

                                {/* Preset Colors */}
                                <div className="flex items-center gap-3 pt-2">
                                <button
                                        title="Royal View Pink"
                                        type="button"
                                    >
                                        <span 
                                            className="w-6 h-5 bg-royal-pink inline-block"
                                            onClick={() => editor.chain().focus().setColor('#d64767').run()}
                                        ></span>
                                    </button>
                                    <button
                                        title="Royal View Blue"
                                        type="button"
                                    >
                                        <span 
                                            className="w-6 h-5 bg-royal-blue inline-block"
                                            onClick={() => editor.chain().focus().setColor('#56739B').run()}
                                        ></span>
                                    </button>
                                    <button
                                        title="Royal View Midnight"
                                        type="button"
                                    >
                                        <span 
                                            className="w-6 h-5 bg-royal-midnight inline-block"
                                            onClick={() => editor.chain().focus().setColor('#242a38').run()}
                                        ></span>
                                    </button>
                                    <button
                                        title="Royal View Graph"
                                        type="button"
                                    >
                                        <span 
                                            className="w-6 h-5 bg-royal-graph inline-block"
                                            onClick={() => editor.chain().focus().setColor('#656a76').run()}
                                        ></span>
                                    </button>
                                    <button 
                                    title="Unset Color"
                                    type="button"
                                    onClick={() => editor.chain().focus().unsetColor().run()}
                                    >
                                    <span 
                                        className="w-6 h-5 bg-transparent inline-block"
                                    >
                                        <RxTransparencyGrid size={20} />
                                    </span>
                                    </button>
                                </div>
                                {/* unset color */}
                                
                                
                                <div className="border-l-2 border-gray-300 border h-10 border-r-0"></div>

                            </div>

                            <EditorContent editor={editor} />
                    </div>
                    {/* <div className="min-h-60 py-5">
                        <h2 className="block text-gray-700 text-sm font-bold mb-2">Previsualización</h2>
                        <hr  className="py-5"/>
                        <div className="rich-text" dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                   {
                    process.env.DEV &&
                    <div className="min-h-60 py-5">
                        <h2 className="block text-gray-700 text-sm font-bold mb-2">Previsualización Code</h2>
                        <div>
                            {content}
                        </div>
                    </div>} */}
                </div>
                )
           }
        </>
  )
}
