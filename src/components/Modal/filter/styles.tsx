import styled from "styled-components/native";

export interface IfilterProps {
  activate?: boolean;
}
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 20px;
  justify-items: center;
`;

export const containerHeadline = styled.Text`
  align-self: center;
  font-size: 24px;
  font-weight: 600;
`;
export const contentContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
export const TextArea = styled.TouchableOpacity<IfilterProps>`
  height: 40px;
  flex-direction: row;
  padding: 5px 10px 5px 10px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-right: 10px;

  border-radius: 5px;
  border: 1.2px solid;
  border-color: ${({ theme, activate }) =>
    activate ? theme.COLORS.INFO : theme.COLORS.TEXT_SECONDARY};
  background-color: ${({ theme, activate }) =>
    activate ? theme.COLORS.INFO_SELECTED : theme.COLORS.BACKGROUND};
`;
export const Text = styled.Text<IfilterProps>`
  color: ${({ theme, activate }) =>
    activate ? theme.COLORS.INFO : theme.COLORS.TEXT_SECONDARY};
  text-align: center;
  font-family: "Inter_400Regular";
  font-size: 12px;
  font-weight: 700;
`;
export const FooterText = styled.Text<IfilterProps>`
  color: ${({ theme }) => theme.COLORS.INFO};
  text-align: center;
  font-family: "Inter_400Regular";
  font-size: 16px;
  font-weight: 500;
  align-self: flex-end;
  margin-bottom: 20px;
  flex-direction: row;
`;
export const FooterTextArea = styled.TouchableOpacity`
  flex:1;
  flex-direction: row;
  justify-content: space-between;
`;
export const Loading = styled.ActivityIndicator`
  size: 45px;
  color: #000;
`;
