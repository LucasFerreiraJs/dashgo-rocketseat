import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react"
import { ElementType } from "react"
import Link from 'next/link';
import ActiveLink from "../ActiveLink";

interface INavLinkProps extends ChakraLinkProps {
  children: string;
  icon: ElementType;
  href: string
}

// RiDashboardLine
export default function NavLink({ children, icon, href, ...rest }: INavLinkProps) {

  // <Link display="flex" alignItems="center" align="left" {...rest}>

  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignSelf="flex-start"  {...rest}>
        <Icon as={icon} fontSize="20" ></Icon>
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>

  )

}