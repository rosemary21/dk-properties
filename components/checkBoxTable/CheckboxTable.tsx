"use client";

import useCheckBoxStore from "@/store/CheckBoxStore";
import { Checkbox, Table } from "@mantine/core";
import { useWindowSize } from "usehooks-ts";

export default function CheckboxTable() {
  const { width } = useWindowSize();
  const isChecked1 = useCheckBoxStore((state) => state.isChecked1);
  const isChecked2 = useCheckBoxStore((state) => state.isChecked2);
  const isChecked3 = useCheckBoxStore((state) => state.isChecked3);
  const isChecked4 = useCheckBoxStore((state) => state.isChecked4);
  const isChecked5 = useCheckBoxStore((state) => state.isChecked5);
  const isChecked6 = useCheckBoxStore((state) => state.isChecked6);
  const isChecked7 = useCheckBoxStore((state) => state.isChecked7);
  const isChecked8 = useCheckBoxStore((state) => state.isChecked8);
  const onChangeChecked1 = useCheckBoxStore((state) => state.onChangeCheck1);
  const onChangeChecked2 = useCheckBoxStore((state) => state.onChangeCheck2);
  const onChangeChecked3 = useCheckBoxStore((state) => state.onChangeCheck3);
  const onChangeChecked4 = useCheckBoxStore((state) => state.onChangeCheck4);
  const onChangeChecked5 = useCheckBoxStore((state) => state.onChangeCheck5);
  const onChangeChecked6 = useCheckBoxStore((state) => state.onChangeCheck6);
  const onChangeChecked7 = useCheckBoxStore((state) => state.onChangeCheck7);
  const onChangeChecked8 = useCheckBoxStore((state) => state.onChangeCheck8);
  const handleRefresh = useCheckBoxStore((state) => state.refresh);
  return (
    <Table
      striped
      highlightOnHover
      withTableBorder
      withColumnBorders
      className="sm:w-full md:w-[566px]"
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th colSpan={4}>Prices</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>
            <Checkbox
              color="#E80E0F"
              iconColor="white"
              size={width < 577 ? "sm" : "md"}
              label="500k"
              checked={isChecked1}
              onChange={onChangeChecked1}
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
              color="#E80E0F"
              iconColor="white"
              size={width < 576 ? "sm" : "md"}
              label="1M"
              checked={isChecked2}
              onChange={onChangeChecked2}
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
              color="#E80E0F"
              iconColor="white"
              size={width < 576 ? "sm" : "md"}
              label="2.5M"
              checked={isChecked3}
              onChange={onChangeChecked3}
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
              color="#E80E0F"
              iconColor="white"
              size={width < 576 ? "sm" : "md"}
              label="5M"
              checked={isChecked4}
              onChange={onChangeChecked4}
            />
          </Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>
            <Checkbox
              color="#E80E0F"
              iconColor="white"
              size={width < 576 ? "sm" : "md"}
              label="7.5M"
              checked={isChecked5}
              onChange={onChangeChecked5}
            />
          </Table.Td>

          <Table.Td>
            <Checkbox
              color="#E80E0F"
              iconColor="white"
              size={width < 576 ? "sm" : "md"}
              label="10M"
              checked={isChecked6}
              onChange={onChangeChecked6}
            />
          </Table.Td>

          <Table.Td>
            <Checkbox
              color="#E80E0F"
              iconColor="white"
              size={width < 576 ? "sm" : "md"}
              label="15M"
              checked={isChecked7}
              onChange={onChangeChecked7}
            />
          </Table.Td>

          <Table.Td>
            <Checkbox
              color="#E80E0F"
              iconColor="white"
              size={width < 576 ? "sm" : "md"}
              label="20M"
              checked={isChecked8}
              onChange={onChangeChecked8}
            />
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
