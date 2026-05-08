import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, previousPage } from "../features/productSlice";
import styled from "styled-components";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export function HomePagination() {
  const { page, error } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  if (error) return null;

  const canGoBack = page > 1;

  return (
    <PaginationBar>
      <PageBtn
        onClick={() => canGoBack && dispatch(previousPage())}
        disabled={!canGoBack}
        aria-label="Previous page"
        as={motion.button}
        whileTap={canGoBack ? { scale: 0.9 } : {}}
      >
        <HiChevronLeft />
      </PageBtn>

      <PageIndicator>
        <PageNum>{page}</PageNum>
      </PageIndicator>

      <PageBtn
        onClick={() => dispatch(nextPage())}
        aria-label="Next page"
        as={motion.button}
        whileTap={{ scale: 0.9 }}
      >
        <HiChevronRight />
      </PageBtn>
    </PaginationBar>
  );
}

// ── Styles ────────────────────────────────────────────────────

const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.25rem 0;
`;

const PageBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.bg_elevated};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  font-size: 1.1rem;
  opacity: ${({ disabled }) => (disabled ? 0.38 : 1)};
  transition: border-color 0.18s, color 0.18s, background 0.18s;

  &:not(:disabled):hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary_muted};
  }
`;

const PageIndicator = styled.div`
  min-width: 40px;
  height: 36px;
  border-radius: 10px;
  background: ${({ theme }) => theme.surface};
  border: 1.5px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
`;

const PageNum = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  letter-spacing: 0.02em;
`;
