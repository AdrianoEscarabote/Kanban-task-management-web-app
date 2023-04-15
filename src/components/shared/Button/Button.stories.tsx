import { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";
import { ButtonProps } from "./ButtonProps";

export default {
  title: "Shared/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    backgroundColor: "#635FC7",
    label: "Button Primary (L)",
    size: "large"
  },
} as Meta<ButtonProps>

export const Large: StoryObj = {}

export const Small: StoryObj = {
  args: {
    label: "Button Primary (S)",
    backgroudColor: "#635FC7",
    size: "small",
  }
}

export const Secondary: StoryObj = {
  args: {
    size: "small",
    label: "Button Secondary",
    backgroundColor: "rgba(99, 95, 199, 0.1)",
    textColor: "#635FC7"
  }
}

export const Destructive: StoryObj = {
  args: {
    textColor: "#FFFFFF",
    label: "Button Destructive",
    backgroundColor: "#EA5555",
    size: "small"
  }
}