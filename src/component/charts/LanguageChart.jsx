import { useState } from 'react'
import { Card, Button } from '../common'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { CHART_COLORS } from '../../utils/constant'
import { FiList, FiPieChart } from 'react-icons/fi'

export const LanguageChart = ({ data }) => {
  const [viewType, setViewType] = useState('pie') // 'pie' or 'bar'
  const [showAll, setShowAll] = useState(false)

  if (!data || data.length === 0) return null

  // Limit to 10 languages for pie chart, show all for bar chart
  const displayData = showAll ? data : data.slice(0, 10)
  const hasMore = data.length > 10

  const totalLanguages = data.length
  const totalRepos = data.reduce((sum, lang) => sum + lang.count, 0)

  const renderTooltip = (props) => {
    if (props.active && props.payload && props.payload[0]) {
      const data = props.payload[0].payload
      const percentage = ((data.count / totalRepos) * 100).toFixed(1)
      return (
        <div className="bg-gray-900 text-white p-2 rounded shadow-lg text-sm">
          <p className="font-semibold">{data.name}</p>
          <p>Repos: {data.count}</p>
          <p>Percentage: {percentage}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Language Distribution
        </h3>
        <div className="flex gap-2">
          <Button
            variant={viewType === 'pie' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewType('pie')}
            className="flex items-center gap-1"
          >
            <FiPieChart className="w-4 h-4" />
            Pie
          </Button>
          <Button
            variant={viewType === 'bar' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewType('bar')}
            className="flex items-center gap-1"
          >
            <FiList className="w-4 h-4" />
            Bar
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total Languages: <span className="font-bold text-gray-800 dark:text-white">{totalLanguages}</span>
          {' '} | Total Repos: <span className="font-bold text-gray-800 dark:text-white">{totalRepos}</span>
        </p>
      </div>

      {/* Chart */}
      <div className="w-full overflow-x-auto">
        {viewType === 'pie' ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={displayData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {displayData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={renderTooltip} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={Math.max(400, displayData.length * 40)}>
            <BarChart data={displayData} layout="vertical" margin={{ top: 5, right: 70, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={95} 
                tick={{ fontSize: 11 }}
                interval={0}
              />
              <Tooltip content={renderTooltip} />
              <Bar dataKey="count" fill="#0969da" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Show All Button */}
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? `Show Top 10` : `Show All ${totalLanguages} Languages`}
          </Button>
        </div>
      )}

      {/* Language List */}
      {showAll && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg max-h-64 overflow-y-auto">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
            All Languages
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {data.map((lang, index) => (
              <div
                key={lang.name}
                className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">
                    {lang.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {lang.count} repo{lang.count !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
