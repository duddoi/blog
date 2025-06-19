import styled from 'styled-components';
const ResponsiveBlock = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  width: 1024px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export default function Responsive(props) {
  return <ResponsiveBlock {...props} />;
}
