
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';

interface SocialUrl {
  url: string;
  urlName: string;
}

interface SocialUrlInputProps {
  socialUrls: SocialUrl[];
  onChange: (socialUrls: SocialUrl[]) => void;
}

const SocialUrlInput: React.FC<SocialUrlInputProps> = ({ socialUrls, onChange }) => {
  const [newUrl, setNewUrl] = useState({ url: '', urlName: '' });

  const addSocialUrl = () => {
    if (newUrl.url.trim() && newUrl.urlName.trim()) {
      onChange([...socialUrls, newUrl]);
      setNewUrl({ url: '', urlName: '' });
    }
  };

  const removeSocialUrl = (index: number) => {
    const updated = socialUrls.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateSocialUrl = (index: number, field: keyof SocialUrl, value: string) => {
    const updated = [...socialUrls];
    updated[index][field] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {socialUrls.map((socialUrl, index) => (
        <Card key={index} className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Нэр (жишээ: Facebook)"
                value={socialUrl.urlName}
                onChange={(e) => updateSocialUrl(index, 'urlName', e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="URL хаяг"
                value={socialUrl.url}
                onChange={(e) => updateSocialUrl(index, 'url', e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeSocialUrl(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Нэр (жишээ: Instagram)"
              value={newUrl.urlName}
              onChange={(e) => setNewUrl({ ...newUrl, urlName: e.target.value })}
              className="flex-1"
            />
            <Input
              placeholder="URL хаяг"
              value={newUrl.url}
              onChange={(e) => setNewUrl({ ...newUrl, url: e.target.value })}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addSocialUrl}
              className="text-green-500 hover:text-green-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialUrlInput;
