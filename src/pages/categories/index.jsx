import React from 'react'
import { useState, useEffect } from 'react'
import { CategoryTable } from '../../components'
import { categories } from '../../service'

const Index = () => {
    const [categoryData, setCategoryData] = useState([])

    const createCategory = async () => {
        const res = await categories.read()
        if (res.status === 200) {
            setCategoryData(res.data.data.categories)
        }
    }
    useEffect(() => {
        createCategory()
    }, [])
    return (
        <div>
            <CategoryTable categoryData={categoryData} />
        </div>
    )
}

export default Index
