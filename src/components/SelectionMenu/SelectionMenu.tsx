import { Link } from '@remix-run/react';
import { FC, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelected } from 'src/store/personsSlice/personsSlice.ts';
import { RootState } from 'src/store/store.ts';
import { generateCsvBlob } from 'src/utils/utils.ts';

const SelectionMenu: FC = () => {
  const dispatch = useDispatch();
  const { selectedPersons } = useSelector(({ persons }: RootState) => persons);
  const selectedData = useMemo(() => Object.values(selectedPersons), [selectedPersons]);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const handleUnselectAll = useCallback(() => {
    dispatch(clearSelected());
  }, [dispatch]);
  const handleDownload = useCallback(() => {
    try {
      const blob = generateCsvBlob(selectedData);

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = URL.createObjectURL(blob);
      }
    } catch (err) {
      console.error('Error generating CSV:', err);
    }
  }, [selectedData]);

  return (
    !!selectedData.length && (
      <div
        data-testid="selection-menu"
        className="fixed bottom-0 left-0 right-0 p-4 border bg-blue-50 flex justify-between items-center"
      >
        <div data-testid="selection-menu-count">{selectedData.length} items are selected</div>
        <div>
          <button
            data-testid="selection-menu-unselect-all"
            className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={handleUnselectAll}
          >
            Unselect all
          </button>
          <Link
            data-testid="selection-menu-download"
            ref={downloadLinkRef}
            to=""
            target="_blank"
            download={`${selectedData.length}_people.csv`}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={handleDownload}
          >
            Download
          </Link>
        </div>
      </div>
    )
  );
};

export default SelectionMenu;
