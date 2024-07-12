import { useCallback, useEffect, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { BsBlockquoteLeft, BsType, BsTypeBold, BsTypeH1, BsTypeH2, BsTypeH3, BsTypeH4, BsTypeItalic } from "react-icons/bs";
import { MdFormatListBulleted, MdOutlineFormatUnderlined, MdOutlineRedo, MdOutlineUndo } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { RxTransparencyGrid } from "react-icons/rx";
import { MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight } from "react-icons/md";
import Underline from "@tiptap/extension-underline";
import { IoIosLink } from "react-icons/io";
import { Form, Input } from "antd";
import dompurify from 'dompurify';
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";


interface Props {
    provider: TiptapCollabProvider,
    minutaId?: string
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const doc = new Y.Doc()

const colors = [
    '#958DF1',
    '#F98181',
    '#FBBC88',
    '#FAF594',
    '#70CFF8',
    '#94FADB',
    '#B9F18D',
    '#C3E2C2',
    '#EAECCC',
    '#AFC8AD',
    '#EEC759',
    '#9BB8CD',
    '#FF90BC',
    '#FFC0D9',
    '#DC8686',
    '#7ED7C1',
    '#F3EEEA',
    '#89B9AD',
    '#D0BFFF',
    '#FFF8C9',
    '#CBFFA9',
    '#9BABB8',
    '#E3F4F4',
  ]


export const Editor = ({provider, setFieldValue, minutaId}: Props ) => {

    const {nombre, apellidoPaterno} = useAppSelector(state => state.auth.userAuth)
    const [status, setStatus] = useState('loading')

    const getRandomElement = (list:string[]) => list[Math.floor(Math.random() * list.length)]

    const [currentUser, setCurrentUser] = useState({
        name: `${nombre} ${apellidoPaterno}`,
        color: getRandomElement(colors),
    })


    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Collaboration.configure({
                document: provider.document,
            }),
            CollaborationCursor.configure({
                provider,
            }),
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
                    HTMLAttributes: {
                        class: 'text-2xl font-bold',
                    }
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
                history: false

            }),
        ],
        editorProps: {
            attributes: {
                class: 'p-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rich-text min-h-[300px] max-h-[400px] overflow-y-auto',
            },
            
        },
        onUpdate: ({ editor, transaction }) => {                        
            const purified = dompurify.sanitize(editor.getHTML());
            setFieldValue('content', purified);
        },
    }, [provider]);

    useEffect(() => {
        // Update status changes
        const statusHandler = (event:any) => {
          setStatus(event.status)
        }
        provider.on('status', statusHandler)
    
        return () => {
          provider.off('status', statusHandler)
        }
      }, [provider])

    useEffect(() => {
        if(editor && currentUser) {
            localStorage.setItem('tiptap-user', JSON.stringify(currentUser))
            // editor.chain().focus().updateUser(currentUser).run()
        }
    }, [editor, currentUser])


  return (
    <>
    
    <Form.Item name="content" className="hidden">
        <Input type="hidden" id="content" name="content" onChange={(e) => setFieldValue('content', e.target.value)} />
    </Form.Item>
    {
            editor && (
                <div className="">
                    <div className="border">
                        <div className="flex flex-wrap gap-5 px-2 border items-center py-1  bg-white sticky top-0 z-50">
                                <button 
                                    title="Titulo 1"
                                    type="button"
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
                                    className={`text-gray-500 px-2 py-1 rounded-md ${ editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
                                    disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
                                ><BsTypeH1 /></button>
                                <button 
                                    title="Parrafo"
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

                                {/* <div className="border-l-2 border-gray-300 border h-10 border-r-0"></div> */}

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
                                            className="w-6 h-5 bg-devarana-blue inline-block"
                                            onClick={() => editor.chain().focus().setColor('#56739B').run()}
                                        ></span>
                                    </button>
                                    <button
                                        title="Royal View Blue"
                                        type="button"
                                    >
                                        <span 
                                            className="w-6 h-5 bg-devarana-pink inline-block"
                                            onClick={() => editor.chain().focus().setColor('#d64767').run()}
                                        ></span>
                                    </button>
                                    <button
                                        title="Royal View Midnight"
                                        type="button"
                                    >
                                        <span 
                                            className="w-6 h-5 bg-devarana-hazelnut inline-block"
                                            onClick={() => editor.chain().focus().setColor('#eadfd4').run()}
                                        ></span>
                                    </button>
                                    <button
                                        title="Royal View Graph"
                                        type="button"
                                    >
                                        <span 
                                            className="w-6 h-5 bg-devarana-graph inline-block"
                                            onClick={() => editor.chain().focus().setColor('#848891').run()}
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
                        <EditorContent key={minutaId} editor={editor} className="text-devarana-graph"/>
                            <div className="collab-status-group" data-state={status === 'connected' ? 'online' : 'offline'}>
                           <div className="flex items-center justify-between px-5 py-1">
                                <label
                                    className="text-xs text-default"
                                >
                                    {status === 'connected'
                                        ? `${editor.storage.collaborationCursor.users.length} usuario${
                                        editor.storage.collaborationCursor.users.length === 1 ? '' : 's'
                                        } online`
                                        : 'offline'}
                                    </label>
                                <p className="text-dark text-xs"> ✎ {currentUser.name}</p>
                           </div>
                        </div>
                    </div>
                </div>
                )
           }
        </>
  )
}
