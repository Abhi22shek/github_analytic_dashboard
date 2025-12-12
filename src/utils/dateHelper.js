import {formatDistanceToNow,format} from 'date-fns'

export const formatDate = (date) => {
    return format(new Date(date), 'MM/dd/yyyy')
}

export const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true
    })
}

export const formatYear = (date) => {
    return format(new Date(date), 'yyyy')
}