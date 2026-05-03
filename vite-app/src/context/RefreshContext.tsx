import { createContext, useContext, useState } from 'react'

const RefreshContext = createContext<{
	refresh: bool
	triggerRefresh: () => void
}>({ refresh: false, triggerRefresh: () => {} })

export const RefreshProvider = ({children}:{children: React.ReactNode }) => {
	const [refresh, setRefresh] = useState(false)
	const triggerRefresh = () => setRefresh(r=>!r)

	return (
		<RefreshContext.Provider value={{ refresh, triggerRefresh }}>
			{children}
		</RefreshContext.Provider>
	)
}

export const useRefresh = () => useContext(RefreshContext)
