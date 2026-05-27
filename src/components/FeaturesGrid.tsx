import { features } from '@/data/content'
import { FeatureCard } from '@/components/FeatureCard'
import {
  CalendarIcon,
  HouseIcon,
  LayersIcon,
  ScopeIcon,
} from '@/components/icons/FeatureIcons'

const iconMap = {
  house: HouseIcon,
  layers: LayersIcon,
  scope: ScopeIcon,
  calendar: CalendarIcon,
} as const

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
      {features.map((feature) => {
        const Icon = iconMap[feature.icon]
        return (
          <FeatureCard
            key={feature.icon}
            icon={<Icon className="h-7 w-7" />}
            text={feature.text}
          />
        )
      })}
    </div>
  )
}
