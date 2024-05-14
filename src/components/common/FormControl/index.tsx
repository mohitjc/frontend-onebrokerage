import { useState } from 'react'
import methodModel from '../../../methods/methods'
import SelectDropdown from '../SelectDropdown'
import './style.scss'
import { Editor } from "@tinymce/tinymce-react";
import tinymcModel from '../../../models/tinymc.model';
import PhoneInput from 'react-phone-input-2';
export default function FormControl({
    name,
    id = "",
    valueType='string',
    onInputChange=(e:any)=>{},
    inputValue='',
    displayValue = 'name',
    placeholder = "",
    type = 'text',
    options = [],
    error,
    label,
    required = false,
    onChange=()=>{},
    maxlength = '',
    minlength = '',
    min='',
    className='',
    value,
    disabled=false,
    theme=''
}:any) {


    const [text,setText]=useState('')

    const add=()=>{
        let arr=value||[]
        if(text){
            arr.push(text)
        }
        onChange(arr)
        setText('')
    }

    const remove=(i:any)=>{
        let arr=value||[]
        arr=arr.filter((itm:any,index:any)=>index!=i)
        onChange(arr)
    }

    const addItem = (v:any) => {
        let arr = value || []
        let ext = arr?.find((itm:any) => itm == v)

        if (ext) {
            arr = arr.filter((itm:any)=>itm != v)
        } else {
            arr.push(v)
        }

        onChange(arr)
    }

    return <>
        <div className="formWrapper mb-6 relative">
            {label ? <>
                <label className='text-sm'>{label} {required ? <><span className="star">*</span></> : <></>}</label>
            </> : <></>}

            {type == 'select' ? <SelectDropdown
                id={`statusDropdown_${id}`}
                displayValue={displayValue}
                className={className}
                valueType={valueType}
                onInputChange={onInputChange}
                inputValue={inputValue}
                placeholder={placeholder}
                intialValue={value||''}
                name={name}
                theme={theme}
                result={(e:any) => { onChange(e.value) }}
                options={options}
                disabled={disabled}
            /> :type=='phone'?<>
            
            <PhoneInput
                country={"us"}
                value={value}
                enableSearch={true}
                onChange={(e) => onChange(e)}
                countryCodeEditable={true}
              />
            </>: type == 'number' ? <input
                type="text"
                name={name}
                className="relative  bg-white w-full rounded-lg h-10 flex items-center gap-2 z-9 overflow-hidden px-2"
                required={required}
                placeholder={placeholder}
                value={value||''}
                maxLength={maxlength}
                minLength={minlength}
                min={min}
                disabled={disabled}
                onChange={e => onChange(methodModel.isNumber(e))}
            /> : type=='badge'?<>
            <div className='flex'>
            <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                placeholder={placeholder}
                value={text}
                disabled={disabled}
                onChange={e => setText(e.target.value)}
            />
            <button type='button' className='btn btn-primary ml-2' disabled={disabled} onClick={add}>Add</button>
            </div>
            <div className=''>
                {value?.map((itm:any,i:any)=>{
                    return <span className='badge badge-primary m-1'>
                        {itm}
                    <i className='fa fa-times ml-1' onClick={()=>remove(i)}></i>
                </span>
                })}
                
            </div>
            </>:type=='radio'?<>
            <div className='flex items-center gap-x-4 mt-3'>
            {options.map((itm:any) => {
                                return<div className=''> <label className="border border-gray-300 px-6 py-2 rounded-lg flex cursor-pointer">
                                    <input type="radio"
                                        checked={value == itm.id ? true : false}
                                        onChange={e => onChange(itm.id)}
                                        className="mr-2" name={name} disabled={disabled} />
                                    {itm.name}</label></div>
                            })}
                            </div>
            </>:type=='editor'?<>
            <Editor
                            textareaName="description"
                            value={value}
                            onEditorChange={(newValue, editor) => {
                              onChange(newValue)
                            }}
                            disabled={disabled}
                            apiKey={tinymcModel.apiKey}
                            init={{
                            //   selector: "textarea#autocompleter-cardmenuitem",
                              height: 250,
                              plugins: tinymcModel.plugins,
                              toolbar: tinymcModel.toolbar,
                            }}
                          />
            </>:type=='checkbox'?<>
            {options.map((itm:any) => {
                                return <label className="flex">
                                    <input type="checkbox"
                                        checked={value?.includes(itm.id) ? true : false}
                                        onChange={e =>addItem(itm.id)}
                                        className="mr-2" />
                                    {itm.name}</label>
                            })}
            </>:<input
                type={type}
                name={name}
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                required={required}
                placeholder={placeholder}
                value={value||''}
                maxLength={maxlength}
                minLength={minlength}
                min={min}
                disabled={disabled}
                onChange={e => {
                    console.log("e",e.target)
                    onChange(e.target.value)
                }}
            />
            }

            {error ? <>
                <div className='text-danger small mt-1'>{error}</div>
            </> : <></>}
        </div>
    </>
}