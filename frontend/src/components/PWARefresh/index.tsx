import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useAppStore } from "../../store/appStore";
import Button from "../Util/Button";

const OuterWrapper = styled.div`
  max-width: 640px;

  position: fixed;
  bottom: 3rem;
  left: 0;
  right: 0;

  padding: 1rem;
  margin: 0 auto;
`;

const InnerWrapper = styled.div`
  padding: 1rem 1rem 0.75rem 1rem;
  background-color: #cccccc;
  border-radius: 5px;
`;

const Text = styled.div`
  font-size: ${props => props.theme.font.big}px;
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

const StyledButton = styled(Button)`
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
`;

interface Props {
  refresh: (reloadPage?: boolean | undefined) => Promise<void>;
}

function PWARefresh({ refresh }: Props) {
  const { t } = useTranslation();

  const setPWANeedRefresh = useAppStore(state => state.setPWANeedRefresh);

  const ok = () => {
    setPWANeedRefresh(false);
    refresh(true);
  }

  const cancel = () => {
    setPWANeedRefresh(false);
  }

  return (
    <OuterWrapper>
      <InnerWrapper>
        <Text>{t("new_version_available")}</Text>
        <ButtonWrapper>
          <StyledButton size="big" onClick={ok}>{t("refresh")}</StyledButton>
          <StyledButton size="big" onClick={cancel}>{t("cancel")}</StyledButton>
        </ButtonWrapper>
      </InnerWrapper>
    </OuterWrapper>
  )
}

export default PWARefresh