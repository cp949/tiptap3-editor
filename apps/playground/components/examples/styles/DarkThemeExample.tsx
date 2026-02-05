import { RichEditor } from "@cp949/tiptap3-editor";

export const DarkThemeExample = () => {
    // By adding the "dark" class to a parent element, the editor automatically adapts
    // using the built-in dark mode variables defined in variables.css.
    
    return (
        <div className="p-8 bg-gray-900 rounded-lg min-h-[600px]">
            <div className="dark">
                <RichEditor 
                    content="<h2>Dark Mode Ready</h2><p>This editor uses CSS variables to adapt to dark backgrounds perfectly.</p>" 
                    className="shadow-2xl"
                />
            </div>
            
            <p className="mt-4 text-gray-400 text-sm text-center">
                The parent container has the <code>dark</code> class.
            </p>
        </div>
    );
};
