import styles from "./AddTag.module.css";
import { AddTagProps } from "./AddTag.props";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import TagItem from "../TagItem/TagItem";
import cn from "classnames";
import Popup from "reactjs-popup";
import CreateTag from "../CreateTag/CreateTag";

function AddTag({ tags }: AddTagProps) {
    const allTags = useSelector((s: RootState) => s.tagList);

    const getTagList = () => {
        if (!tags && !allTags) {
            return;
        }
        let have: JSX.Element[] = [];
        if (tags) {
            have = tags.map(t => {
                return <TagItem key={t.name} tag={t} status={true}></TagItem>;
            });
        }
        const havent = allTags.tags
            .filter(t => {
                if (tags) {
                    return !tags.find(t2 => t2.name == t.name);
                }
                return true;
            })
            .map(t => {
                return <TagItem tag={t} status={false}></TagItem>;
            });
        if (havent) {
            return have.concat(havent);
        }
        return have;
    };

    return <>
        <Popup trigger={open => (
            <button className={styles["tag-button-wrapper"]}>
                <div className={styles["tag-button"]}>
                    <div className={cn(styles["tag-button-text"], {
                        [styles["tag-button-active"]]: open
                    })}>
                        Add tags
                    </div>
                </div>
            </button>
        )}
            position="top center"
            nested
            className={styles["popup"]}>
            <div onClick={(e) => e.stopPropagation()} className={cn(styles["tag-popup"])}>
                <div className={styles["header"]}>
                    Add tag
                </div>
                <div className={styles["body"]}>
                    {getTagList()}
                </div>
                <CreateTag></CreateTag>
            </div>
        </Popup>
    </>;
}

export default AddTag;