import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '@zeep/assets/images/background.jpg';
import WithDirection from '@zeep/lib/helpers/rtl';

const ResetPasswordStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
  }

  .isoFormContentWrapper {
    width: 450px;
    overflow-y: auto;
    z-index: 10;
    position: relative;
    margin: auto;
  }

  .isoFormContent {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 70px 50px;
    position: relative;
    color: #ffffff;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }

    .isoLogoWrapper {
      width: 100%;
      display: block;
      margin-bottom: 30px;
      justify-content: center;
      text-align: center;

      h1 {
        color: #ffff;
        font-weight: bolder;
        font-weight: bolder;
        line-height: 70px;
        letter-spacing: 3px;
      }

      img {
        width: 150px;
        display: block;
        margin: auto;
        paddingTop: 1em;
        paddingBottom: 1em;
      }
    }

    .isoFormHeadText {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      justify-content: center;

      h3 {
        color: #ffff;
      }

      p {
        font-size: 13px;
        font-weight: 400;
        line-height: 1.2;
        margin: 0;
        color: #ffff;
      }
    }

    .isoResetPassForm {
      width: 100%;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;

      .isoInputWrapper {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        input {
          &::-webkit-input-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &:-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &::-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }
          &:-ms-input-placeholder {
            color: ${palette('grayscale', 0)};
          }
        }

        .icon {
          color: ${palette('text', 3)};
        }

        button {
          height: 42px;
          width: 100%;
          font-weight: 500;
          font-size: 13px;
          border-radius: 20px;
        }

        button:disabled {
          background-color: #0161b78c;
          color: #d4d8e3;
          border-color: rgba(0, 0, 0, 0.12);
        }
      }
      .extraPadTop {
        padding-top: 20px;
      }
    }
  }
`;

export default WithDirection(ResetPasswordStyleWrapper);
