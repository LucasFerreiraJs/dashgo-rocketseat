import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface ISidebarDrawerProviderProps {
  children: ReactNode

}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);


export function SidebarDrawerProvider({ children }: ISidebarDrawerProviderProps) {
  const disclousure = useDisclosure();
  const router = useRouter();

// toda vez que a rota mudar
  useEffect(()=>{
    disclousure.onClose();

  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={disclousure}>
      {children}
    </SidebarDrawerContext.Provider>

  );

}


export const useSidebarDrawer = () => useContext(SidebarDrawerContext);