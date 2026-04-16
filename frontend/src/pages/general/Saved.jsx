import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import api from '../../lib/api'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        api.get('/api/food/save')
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                setVideos(savedFoods)
            })
    }, [])

    const removeSaved = async (item) => {
        try {
            await api.post('/api/food/save', { foodId: item._id })
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v))
        } catch {
            // noop
        }
    }

    return (
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved bites yet."
        />
    )
}

export default Saved
