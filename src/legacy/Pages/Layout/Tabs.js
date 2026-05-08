import React from "react";
import styled, { keyframes, css } from "styled-components";
import MenuItem from "../../components/MenuItem";
import { useSelector } from "react-redux";
import ErrorHandler from "../../components/ErrorHandler";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

// ── Skeleton card ─────────────────────────────────────────────
const SkeletonCard = () => (
  <SkeletonContainer>
    <SkeletonImage />
    <SkeletonBody>
      <SkeletonLine width="72%" height="17px" />
      <SkeletonLine width="42%" height="13px" />
      <SkeletonLine width="58%" height="13px" />
      <SkeletonRow>
        <SkeletonLine width="32%" height="15px" />
        <SkeletonLine width="26%" height="15px" />
      </SkeletonRow>
    </SkeletonBody>
  </SkeletonContainer>
);

// ── Component ─────────────────────────────────────────────────
function Tabs() {
  const { products, isLoading, error } = useSelector((store) => store.product);

  if (error) return <ErrorHandler />;

  if (isLoading) {
    return (
      <GridContainer>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </GridContainer>
    );
  }

  return (
    <GridContainer
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products?.menuItems?.map((product, index) => (
        <MenuItem key={product.id ?? index} {...product} />
      ))}
    </GridContainer>
  );
}

export default Tabs;

// ── Styles ────────────────────────────────────────────────────
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  gap: 1.125rem;
  width: 100%;
`;

// Skeleton animation
const shimmerAnim = keyframes`
  0%   { background-position: -700px 0; }
  100% { background-position:  700px 0; }
`;

const shimmerStyle = (theme) => css`
  background: linear-gradient(
    90deg,
    ${theme.surface}   25%,
    ${theme.surface_2} 50%,
    ${theme.surface}   75%
  );
  background-size: 700px 100%;
  animation: ${shimmerAnim} 1.4s ease-in-out infinite;
`;

const SkeletonContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.bg_card};
  box-shadow: ${({ theme }) => theme.shadow_sm};
  border: 1px solid ${({ theme }) => theme.border};
`;

const SkeletonImage = styled.div`
  height: 188px;
  ${({ theme }) => shimmerStyle(theme)}
`;

const SkeletonBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const SkeletonLine = styled.div`
  height: ${({ height }) => height ?? "14px"};
  width: ${({ width }) => width ?? "100%"};
  border-radius: 6px;
  ${({ theme }) => shimmerStyle(theme)}
`;

const SkeletonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
`;
