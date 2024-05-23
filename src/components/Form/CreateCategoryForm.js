import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

const CreateCategoryForm = ({ category, setCategory, handleSubmit, loading}) => {
    return (
        <>
            <div className='md:w-2/3 w-4/5'>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2 md:w-1/2 w-full">
                        <input
                            name="category"
                            type="text"
                            placeholder='Enter new category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 text-lg sm:leading-6"
                        />
                    </div>
                    <button type='submit'
                        className=" mt-4 flex h-11 justify-center rounded-md bg-indigo-500 px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {loading ? <TailSpin height={30} width={30} color="#fff" /> : "Add"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateCategoryForm