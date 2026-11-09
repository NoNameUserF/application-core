import {FC, useState} from "react";
import GSUInput from "../../GsuInputs/GsuInput";
import GsuButton from "../../GsuButton";
import GSUErrorComponent from "../../GSUErrorComponent";
import {validateDescription, validateEmail, validateName} from "../../../utils/commonUtils";
import {fetchPost} from "../../../api/api";
import httpResponseCodeList from "../../../helpers/httpResponseCodeList";
import {secondNumberValueList} from "../../../helpers/commonUtilsHelpers";

import {HOST} from "../../../envs/env";

import styles from "./index.module.css";
import {EmailIcon} from "../../../assets/Icons";
import GsuTextArea from "../../GsuInputs/GsuTextArea";

interface FeedbackModalProps {
    appName: string;
    feedbackImg: string;
}

const GsuFeedbackModal: FC<FeedbackModalProps> = ({appName = "cookingAi", feedbackImg}) => {
    const [success, setSuccess] = useState(false);
    const [loader, setLoader] = useState(false);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')

    const [error, setError] = useState({
        message: "Произошла ошибка, попробуйте отправить сообщение заново",
        show: false,
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        description: "",
    });

    const sendFormData = () => {
        setLoader(true);
        fetchPost(HOST, "/addFeedback", {
            name: name.trim(),
            email: email.trim(),
            description: description.trim(),
        })
            .then(() => {
                    setName('')
                    setEmail('')
                    setDescription('')
                }
            )
            .then(() => {
                setLoader(false);
                setSuccess(true);
            })
            .then(() => setTimeout(() => setSuccess(false), secondNumberValueList.fiveThousands))
            .catch((e) => {
                setLoader(false);
                if (e.status === httpResponseCodeList.tooManyRequests) {
                    setError({
                        ...error,
                        message: "Превышено количество отзывов в день, попробуйте на следующий день",
                        show: true,
                    });
                } else {
                    setError({...error, show: true});
                }
            });
    };

    const handleChangeName = (value: string) => {
        setName(value);
        setFormErrors({
            ...formErrors,
            name: validateName(value),
        });

    }
    const handleChangeEmail = (value: string) => {
        setEmail(value);
        setFormErrors({
            ...formErrors,
            email: validateEmail(value),
        });
    }
    const handleChangeMessage = (value: string) => {
        setDescription(value)
        setFormErrors({
            ...formErrors,
            description: validateDescription(value),
        });

    };

    const isButtonDisabled = () => {
        return (
            !(
                name &&
                description &&
                !formErrors.name &&
                !formErrors.description &&
                !formErrors.email
            ) || loader
        );
    };

    const errorAction = () => {
        setError({
            message: "",
            show: false,
        });
    };

    return (
        <>
            {error.show ? (
                <GSUErrorComponent action={errorAction} text={error.message} label={"Попробовать снова"}/>
            ) : (
                <div
                    className={styles.feedbackModalContainer}>
                    <img className={styles.feedbackModalImg} src={feedbackImg} alt="feedbackImg"/>
                    <h2 className={styles.feedbackModalDescription}>Подскажите, как мы можем стать лучше</h2>
                    <div className={styles.feedbackModalForm}>
                        <GSUInput placeholder={"Имя"}
                                  error={formErrors.name}
                                  value={name}
                                  onChange={handleChangeName}/>

                        <GSUInput
                            error={formErrors.email}
                            placeholder={"Ваш email (необязательно)"}
                            value={email}
                            onChange={handleChangeEmail}
                        />

                        <GsuTextArea
                            error={formErrors.description}
                            placeholder={"Опишите ваше предложение..."}
                            height="86px"
                            value={description}
                            onChange={handleChangeMessage}
                        />
                    </div>
                    <div className={styles.feedbackModalButtonWrapper}>
                        {success && (
                            <div className={styles.feedbackModalSuccess}>
                                <EmailIcon/>
                                <h6 className={styles.feedbackModalSuccessText}>
                                    Сообщение успешно отправлено!
                                </h6>
                            </div>
                        )}
                        <GsuButton
                            disabled={isButtonDisabled()}
                            onClick={sendFormData}
                            text={"Отправить"}
                            btnClassName={styles.feedbackBtn}
                            style={"primary"}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default GsuFeedbackModal;
