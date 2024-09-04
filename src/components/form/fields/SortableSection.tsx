import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { DocumentType } from "../../../model/commonModels";
import { ControlType, IFormField, IFormOptions } from "../../../model/formFlowModels";
import { openModal } from "../../../reducers/commonSlice";
import {
  createKeyValuesForRemoveItem,
  createKeyValuesForSwapItems,
  dispatchFormValue,
  getFieldValue,
  isSectionVisible,
} from "../../../utils/utils";
import { SectionHeader } from "../parts/SectionHeader";
import { SectionSubFields } from "../parts/SectionSubFields";
import "./SortableSection.css";

export interface SortableSectionProps {
  fieldKey: string;
  control: ControlType;
  label: string;
  maxChildPerRow?: number;
  subFields?: IFormField[];
  options?: IFormOptions[] | string;
  placeholder?: string;
  format?: string;
  className?: string;
  visibility?: string;
  hideHeader?: boolean;
  fieldIndex?: number;
  documentType?: DocumentType;
}

export function SortableSection(props: SortableSectionProps) {
  const dispatch = useAppDispatch();
  const { wt, t } = useFormTranslation();
  const caseDetails = useAppSelector(state => state.form.applicationCase?.profile);
  const sortableSectionRef = useRef<HTMLDivElement>(null);

  const fieldValue = getFieldValue(
    caseDetails,
    props.fieldKey,
    props.control,
    props.options,
    props.format,
    props.fieldIndex,
  );

  const previousArrLength = useRef(fieldValue.arr.length);

  useEffect(() => {
    console.log("testing sortable section", fieldValue);
    if (fieldValue.arr.length > previousArrLength.current) {
      dispatch(
        openModal({
          modalType: "sortableSectionAddModal",
          modalData: {
            label: t("Add") + " " + wt(props.label),
            content: (
              <SectionSubFields
                className={"section-popup"}
                subFields={props.subFields}
                fieldIndex={previousArrLength.current}
              />
            ),
          },
        }),
      );
    }
    // Update the previous length
    previousArrLength.current = fieldValue.arr.length;
  }, [fieldValue.arr]);

  useEffect(() => {
    if (!sortableSectionRef.current) return;

    const rect = sortableSectionRef.current.getBoundingClientRect();

    // Add tooltip for sortable section
    const sortableSection = document.getElementById("sortable-section");
    sortableSection?.addEventListener("mousemove", function (event: Event) {
      const x = (event as MouseEvent).clientX - rect.left + 10;
      const y = (event as MouseEvent).clientY - rect.top + 10;
      const tooltip = document.getElementById("section-tooltip") as HTMLElement;
      tooltip.style.left = x + "px";
      tooltip.style.top = y + "px";
    });

    return () => {
      sortableSection?.removeEventListener("mousemove", function (event: Event) {
        const x = (event as MouseEvent).clientX - rect.left;
        const y = (event as MouseEvent).clientY - rect.top;
        const tooltip = document.getElementById("section-tooltip") as HTMLElement;
        tooltip.style.left = x + "px";
        tooltip.style.top = y + "px";
      });
    };
  }, []);

  const addSectionBottomBorder = (index: number) => {
    const sectionId = `sortable-section-${index}`;
    const section = document.getElementById(sectionId) as HTMLElement;
    section.style.borderBottom = "15px dashed #e0e0e0";
  };

  const removeSectionBottomBorder = (index: number) => {
    const sectionId = `sortable-section-${index}`;
    const section = document.getElementById(sectionId) as HTMLElement;
    section.style.borderBottom = "none";
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("startIndex", index.toString());
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    addSectionBottomBorder(index);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    removeSectionBottomBorder(index);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    removeSectionBottomBorder(index);

    const startIndex = Number(e.dataTransfer.getData("startIndex"));
    const targetIndex = index;
    if (startIndex === targetIndex) return;
    const keyValues = createKeyValuesForSwapItems(fieldValue, startIndex, targetIndex);
    dispatchFormValue(dispatch, keyValues);
  };

  let innerComponent = <div>Empty content, please contact quickimmi.</div>;

  if (props.subFields && props.subFields.length > 0) {
    if (props.visibility) {
      const isVisible = isSectionVisible(props.visibility, caseDetails, props.fieldIndex);
      if (!isVisible) {
        innerComponent = <></>;
      }
    }
    if (fieldValue && Array.isArray(fieldValue.arr)) {
      innerComponent = (
        <div className="sortable-section" id="sortable-section" ref={sortableSectionRef}>
          <div className="section-tooltip" id="section-tooltip">
            {t("Drag and drop to change the order")}
          </div>

          {fieldValue.arr.map((_i, arrIndex) => (
            <div
              key={arrIndex}
              id={`sortable-section-${arrIndex}`}
              className="section-container sortable"
              draggable
              onDragStart={e => handleDragStart(e, arrIndex)}
              onDragOver={e => handleDragEnter(e, arrIndex)}
              onDragLeave={e => handleDragLeave(e, arrIndex)}
              onDrop={e => handleDragEnd(e, arrIndex)}
            >
              <SectionHeader
                label={wt(props.label)}
                fieldIndex={arrIndex}
                onRemove={() => {
                  const keyValues = createKeyValuesForRemoveItem(fieldValue, arrIndex);
                  dispatchFormValue(dispatch, keyValues, arrIndex);
                }}
                onEdit={() => {
                  dispatch(
                    openModal({
                      modalType: "sortableSectionAddModal",
                      modalData: {
                        label: t("Edit") + " " + wt(props.label),
                        content: (
                          <SectionSubFields
                            className={"section-popup"}
                            subFields={props.subFields}
                            fieldIndex={arrIndex}
                          />
                        ),
                      },
                    }),
                  );
                }}
              />
              <SectionSubFields
                className={"section-view"}
                subFields={props.subFields}
                fieldIndex={arrIndex}
                mode={"view"}
              />
            </div>
          ))}
        </div>
      );
    }
  }

  return <>{innerComponent}</>;
}
